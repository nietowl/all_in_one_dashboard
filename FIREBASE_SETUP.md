# Firebase Authentication Setup

## Overview
This application now uses Firebase Authentication for user registration, login, and user management. User profiles and organizations are stored in Firestore.

## Setup Instructions

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Enable Google Analytics (optional)

### 2. Enable Authentication
1. In your Firebase project, go to "Authentication" → "Get started"
2. Go to "Sign-in method" tab
3. Enable "Email/Password" provider
4. Save the settings

### 3. Set up Firestore Database
1. Go to "Firestore Database" → "Create database"
2. Choose "Start in test mode" (you can configure security rules later)
3. Select a location for your database

### 4. Get Firebase Configuration
1. Go to "Project Settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" → Web app (</>)
4. Register your app with a nickname
5. Copy the Firebase configuration object

### 5. Configure Environment Variables
1. Copy `.env.example` to `.env`
2. Fill in your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 6. Start Development Server
```bash
npm run dev
```

## Features Implemented

### Authentication
- ✅ User registration with email/password
- ✅ User login with email/password
- ✅ User logout
- ✅ Password reset via email
- ✅ Email verification
- ✅ Protected routes
- ✅ Persistent authentication state

### User Management
- ✅ User profiles stored in Firestore
- ✅ Organization management
- ✅ Role-based access control
- ✅ Profile updates

### Data Structure

#### Users Collection (`users/{userId}`)
```javascript
{
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  organizationId: "org_123",
  organizationName: "My Company",
  role: "owner", // owner, admin, user
  createdAt: timestamp,
  lastLogin: timestamp,
  emailVerified: boolean
}
```

#### Organizations Collection (`organizations/{orgId}`)
```javascript
{
  name: "My Company",
  ownerId: "user_123",
  createdAt: timestamp,
  settings: {
    allowedDomains: [],
    twoFactorRequired: false
  }
}
```

## Test Credentials
After setting up Firebase, you can create test accounts through the registration form.

## Security Rules (Optional)
For production, update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Organization members can read their organization
    match /organizations/{orgId} {
      allow read: if request.auth != null &&
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.organizationId == orgId;

      // Only owners can write to organization
      allow write: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "owner";
    }
  }
}
```

## Troubleshooting

### Common Issues
1. **"Firebase app not initialized"** - Check your `.env` file and restart the dev server
2. **"Auth domain not authorized"** - Add your domain to authorized domains in Firebase console
3. **"Firestore rules deny permission"** - Update security rules or use test mode during development

### Development Mode
During development, Firestore runs in test mode with open security rules. Make sure to configure proper security rules before going to production.