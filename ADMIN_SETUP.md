# Admin Account Setup Guide

## How to Set Admin Role for Accounts

### Option 1: Database Direct Update
If you have direct database access:

```sql
-- Update user role to admin
UPDATE users SET role = 'admin' WHERE email = 'your-email@domain.com';

-- Or update by user ID
UPDATE users SET role = 'admin' WHERE id = 1;
```

### Option 2: Through Redux Store (Development)
In your authentication slice, you can temporarily set the role:

```javascript
// In authSlice.js - for development only
const user = {
  ...userData,
  role: 'admin' // Force admin role
};
```

### Option 3: Environment Variable (Recommended)
Add to your `.env` file:

```env
REACT_APP_ADMIN_EMAILS=admin@company.com,super@company.com
```

Then in your login logic:
```javascript
const adminEmails = process.env.REACT_APP_ADMIN_EMAILS?.split(',') || [];
const userRole = adminEmails.includes(user.email) ? 'admin' : user.role;
```

### Available Roles:
- `admin` - Full access to everything
- `analyst` - All intelligence data access
- `stealer_analyst` - Only stealer logs + dashboard
- `darkweb_analyst` - Only dark web + dashboard
- `viewer` - Dashboard only

### Quick Fix for Now:
1. In your browser dev tools, go to Redux DevTools
2. Find the auth state
3. Manually change the user.role to 'admin'
4. Or temporarily hardcode `role: 'admin'` in the user object

## Permission System
The permission system is in `/src/utils/permissions.js` and can be enabled by:
1. Uncommenting the permission filtering in Sidebar.jsx
2. Ensuring user roles are properly set in your backend/database