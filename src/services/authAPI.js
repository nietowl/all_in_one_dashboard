import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  updatePassword,
  updateProfile as updateFirebaseProfile,
  onAuthStateChanged
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db } from '../firebase/config';

// Helper function to get Firebase error message
const getFirebaseErrorMessage = (error) => {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'No user found with this email address';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/email-already-in-use':
      return 'Email address is already registered';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters';
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later';
    default:
      return error.message || 'An error occurred';
  }
};

// Auth API functions
export const authAPI = {
  // Login user
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get user profile from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.exists() ? userDoc.data() : {};

      return {
        user: {
          id: user.uid,
          email: user.email,
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          organizationId: userData.organizationId || '',
          organizationName: userData.organizationName || '',
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          createdAt: userData.createdAt || user.metadata.creationTime
        },
        accessToken: await user.getIdToken(),
        refreshToken: user.refreshToken
      };
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(getFirebaseErrorMessage(error));
    }
  },

  // Register user and organization
  register: async (email, password, firstName, lastName, organizationName) => {
    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name
      await updateFirebaseProfile(user, {
        displayName: `${firstName} ${lastName}`
      });

      // Create organization document first
      const orgRef = await addDoc(collection(db, 'organizations'), {
        name: organizationName,
        createdAt: serverTimestamp(),
        ownerId: user.uid,
        settings: {
          allowedDomains: [],
          twoFactorRequired: false
        }
      });

      // Create user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        email,
        organizationId: orgRef.id,
        organizationName,
        role: 'owner',
        createdAt: serverTimestamp(),
        emailVerified: false,
        lastLogin: serverTimestamp()
      });

      // Send email verification
      await sendEmailVerification(user);

      return {
        user: {
          id: user.uid,
          email: user.email,
          firstName,
          lastName,
          organizationId: orgRef.id,
          organizationName,
          emailVerified: false
        },
        message: 'Registration successful. Please verify your email.'
      };
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error(getFirebaseErrorMessage(error));
    }
  },

  // Logout user
  logout: async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  },

  // Send email verification
  verifyEmail: async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        return { message: 'Verification email sent' };
      }
      throw new Error('No user logged in');
    } catch (error) {
      console.error('Email verification error:', error);
      throw new Error(getFirebaseErrorMessage(error));
    }
  },

  // Request password reset
  requestPasswordReset: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { message: 'Password reset email sent' };
    } catch (error) {
      console.error('Password reset request error:', error);
      throw new Error(getFirebaseErrorMessage(error));
    }
  },

  // Change password (for authenticated users)
  changePassword: async (newPassword) => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, newPassword);
        return { message: 'Password updated successfully' };
      }
      throw new Error('No user logged in');
    } catch (error) {
      console.error('Password change error:', error);
      throw new Error(getFirebaseErrorMessage(error));
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user logged in');

      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        ...profileData,
        updatedAt: serverTimestamp()
      });

      // Update Firebase Auth profile if display name changed
      if (profileData.firstName || profileData.lastName) {
        await updateFirebaseProfile(user, {
          displayName: `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim()
        });
      }

      return { message: 'Profile updated successfully' };
    } catch (error) {
      console.error('Profile update error:', error);
      throw new Error(getFirebaseErrorMessage(error));
    }
  },

  // Get user profile
  getProfile: async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user logged in');

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        throw new Error('User profile not found');
      }

      const userData = userDoc.data();
      return {
        user: {
          id: user.uid,
          email: user.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          organizationId: userData.organizationId,
          organizationName: userData.organizationName,
          role: userData.role,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          createdAt: userData.createdAt
        }
      };
    } catch (error) {
      console.error('Get profile error:', error);
      throw new Error(getFirebaseErrorMessage(error));
    }
  },

  // Auth state observer
  onAuthStateChanged: (callback) => {
    return onAuthStateChanged(auth, callback);
  },

  // Get current user
  getCurrentUser: () => {
    return auth.currentUser;
  },

  // Get user token
  getUserToken: async () => {
    const user = auth.currentUser;
    if (user) {
      return await user.getIdToken();
    }
    return null;
  }
};