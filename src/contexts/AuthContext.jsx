import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authAPI } from '../services/authAPI';
import { setAuthUser, clearAuth, setInitialized } from '../store/slices/authSlice';

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Set up Firebase auth state listener
    const unsubscribe = authAPI.onAuthStateChanged(async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // User is signed in - get profile data from Firestore
          try {
            const userData = await authAPI.getProfile();
            dispatch(setAuthUser({ user: userData.user }));
          } catch (profileError) {
            // If profile doesn't exist, create basic user object from Firebase user
            console.warn('Profile not found, using Firebase user data:', profileError);
            dispatch(setAuthUser({
              user: {
                id: firebaseUser.uid,
                email: firebaseUser.email,
                firstName: '',
                lastName: '',
                organizationId: '',
                organizationName: '',
                emailVerified: firebaseUser.emailVerified
              }
            }));
          }
        } else {
          // User is signed out
          dispatch(clearAuth());
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        dispatch(clearAuth());
      } finally {
        dispatch(setInitialized());
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
};