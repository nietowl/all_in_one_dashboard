# 🔐 TraceCore Admin Dashboard - Complete Guide

## 👤 Admin Account
**Email**: `admin@tracecore.com`
**Organization**: TraceCore Security
**Role**: Administrator (Full Access)

## 🏢 Administration Features

### 1. 👥 User Management (`/organization/users`)
**Complete user administration with permission control**

#### Features:
- ✅ **View all users** with detailed profiles
- ✅ **Add new users** with role assignment
- ✅ **Change user roles** with real-time permission updates
- ✅ **Activate/Deactivate users**
- ✅ **Search and filter** users by role
- ✅ **Permission visualization** - see exactly what each role can access

#### Available Roles:
1. **Administrator** - Full access to everything
2. **Security Analyst** - All intelligence data access
3. **Stealer Analyst** - Only stealer logs + dashboard
4. **Dark Web Analyst** - Only dark web + dashboard
5. **Viewer** - Dashboard only

#### How to Manage Users:
1. Click **"Add User"** to create new accounts
2. Use the **role dropdown** on each user to change permissions
3. **Toggle user status** active/inactive
4. **Search users** by name or email
5. **Filter by role** to see specific user types

### 2. ⚙️ Organization Settings (`/organization/settings`)
**Comprehensive organization configuration**

#### Tabs Available:

**📋 General Settings:**
- Organization name and domain
- Description and branding
- Timezone and language preferences

**🔒 Security Settings:**
- Two-factor authentication requirements
- Password policies (length, complexity)
- Session timeout configuration
- Allowed email domains
- IP whitelisting

**💾 Data & Storage:**
- Data retention periods
- Automatic backup configuration
- Export/import data tools
- Backup frequency settings

**🔔 Notifications:**
- Email notification preferences
- Threat alert thresholds
- System maintenance alerts
- Weekly report settings

**🔌 Integrations:**
- API rate limiting
- Webhook endpoints
- Syslog server configuration
- External system connections

### 3. 🔑 API Key Management (`/organization/api-keys`)
**Advanced API key administration**

#### Features:
- ✅ **Create API keys** with custom permissions
- ✅ **Set expiration dates** and usage limits
- ✅ **Monitor API usage** with real-time statistics
- ✅ **Permission scoping** - limit what each key can access
- ✅ **Usage tracking** - see requests per day
- ✅ **Key visibility controls** - show/hide sensitive keys

#### API Key Permissions:
- **Dashboard Access** - View main dashboard
- **Stealer Intelligence** - Access stealer logs
- **Dark Web Monitor** - Access dark web data
- **Credential Intel** - Access credential data
- **Export Reports** - Download/export data
- **User Management** - Admin functions

#### How to Manage API Keys:
1. **Create New Key**: Set name, permissions, expiration
2. **Monitor Usage**: Track daily request limits
3. **Copy Keys**: Secure copy-to-clipboard
4. **Revoke Access**: Disable keys instantly
5. **Set Limits**: Control request quotas

## 🛡️ Permission System

### Role Hierarchy:
```
Admin > Analyst > Stealer_Analyst/Darkweb_Analyst > Viewer
```

### Permission Matrix:
| Feature | Viewer | Stealer Analyst | Dark Web Analyst | Analyst | Admin |
|---------|--------|----------------|------------------|---------|-------|
| Dashboard | ✅ | ✅ | ✅ | ✅ | ✅ |
| Stealer Logs | ❌ | ✅ | ❌ | ✅ | ✅ |
| Dark Web | ❌ | ❌ | ✅ | ✅ | ✅ |
| Credentials | ❌ | ❌ | ❌ | ✅ | ✅ |
| Export Data | ❌ | ✅* | ✅* | ✅ | ✅ |
| User Management | ❌ | ❌ | ❌ | ❌ | ✅ |
| Organization Settings | ❌ | ❌ | ❌ | ❌ | ✅ |
| API Keys | ❌ | ❌ | ❌ | ❌ | ✅ |

*Limited to their accessible data only

## 🚀 Quick Start Guide

### 1. Access Admin Panel:
1. **Refresh your browser** - you're auto-logged in as admin@tracecore.com
2. **Navigate to Administration** section in sidebar
3. **Choose your admin task**:
   - Manage users → `/organization/users`
   - Configure settings → `/organization/settings`
   - Manage API keys → `/organization/api-keys`

### 2. Create Your First User:
1. Go to **User Management**
2. Click **"Add User"**
3. Fill in details and **select appropriate role**
4. User will receive invitation email

### 3. Configure Security:
1. Go to **Organization Settings** → **Security**
2. Enable **Two-Factor Authentication**
3. Set **password requirements**
4. Configure **allowed domains**

### 4. Create API Keys:
1. Go to **API Key Management**
2. Click **"Create API Key"**
3. Set **permissions** and **expiration**
4. **Copy the key** securely

## 🎨 Professional Design Features

### ✅ Clean & Professional:
- **Subtle blue/slate color scheme** (no funky colors)
- **Proper spacing and typography**
- **Consistent component sizing**
- **Professional status indicators**

### ✅ Functional Features:
- **Working sidebar collapse**
- **Functional quick actions**
- **Real-time permission updates**
- **Interactive role management**
- **Live usage monitoring**

### ✅ User Experience:
- **Responsive design**
- **Intuitive navigation**
- **Clear visual hierarchy**
- **Helpful tooltips and guides**

## 🔧 Technical Implementation

### Permission System (`/src/utils/permissions.js`):
- **Role-based access control**
- **Dynamic permission checking**
- **Route-level protection**
- **UI element filtering**

### Components:
- **UserManagement.jsx** - Full user admin interface
- **OrganizationSettings.jsx** - Organization configuration
- **ApiKeyManagement.jsx** - API key administration

### Integration:
- **Redux state management**
- **React Router navigation**
- **Component-level permissions**
- **Real-time updates**

## 🎯 What You Can Do Now

✅ **Full admin dashboard access**
✅ **Complete user management**
✅ **Organization configuration**
✅ **API key administration**
✅ **Permission assignment**
✅ **Security configuration**
✅ **Professional design**

**Everything is fully functional and ready to use!**