import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Users,
  UserPlus,
  Edit3,
  Trash2,
  Shield,
  Eye,
  Database,
  Globe,
  List,
  Settings,
  Key,
  Building,
  Mail,
  Calendar,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { ROLES, PERMISSIONS, getRolePermissions } from '../../utils/permissions';

const UserManagement = () => {
  const { user: currentUser } = useSelector(state => state.auth);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showAddUser, setShowAddUser] = useState(false);

  // Mock users data - in real app this would come from API/Firebase
  const [users, setUsers] = useState([
    {
      id: 'tracecore-admin-001',
      firstName: 'TraceCore',
      lastName: 'Administrator',
      email: 'admin@tracecore.com',
      role: 'admin',
      status: 'active',
      lastLogin: new Date(),
      createdAt: new Date('2024-01-01'),
      emailVerified: true
    },
    {
      id: 'user-002',
      firstName: 'John',
      lastName: 'Analyst',
      email: 'john.analyst@tracecore.com',
      role: 'analyst',
      status: 'active',
      lastLogin: new Date(Date.now() - 86400000), // 1 day ago
      createdAt: new Date('2024-01-15'),
      emailVerified: true
    },
    {
      id: 'user-003',
      firstName: 'Sarah',
      lastName: 'Stealer',
      email: 'sarah.stealer@tracecore.com',
      role: 'stealer_analyst',
      status: 'active',
      lastLogin: new Date(Date.now() - 3600000), // 1 hour ago
      createdAt: new Date('2024-02-01'),
      emailVerified: true
    },
    {
      id: 'user-004',
      firstName: 'Mike',
      lastName: 'Viewer',
      email: 'mike.viewer@tracecore.com',
      role: 'viewer',
      status: 'inactive',
      lastLogin: new Date(Date.now() - 604800000), // 1 week ago
      createdAt: new Date('2024-02-15'),
      emailVerified: false
    }
  ]);

  const roleColors = {
    admin: 'bg-red-600/20 text-red-300 border-red-500/30',
    analyst: 'bg-blue-600/20 text-blue-300 border-blue-500/30',
    stealer_analyst: 'bg-orange-600/20 text-orange-300 border-orange-500/30',
    darkweb_analyst: 'bg-purple-600/20 text-purple-300 border-purple-500/30',
    viewer: 'bg-gray-600/20 text-gray-300 border-gray-500/30'
  };

  const statusColors = {
    active: 'text-green-400',
    inactive: 'text-red-400',
    pending: 'text-yellow-400'
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = selectedRole === 'all' || user.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  const getRoleDisplayName = (role) => {
    const roleNames = {
      admin: 'Administrator',
      analyst: 'Security Analyst',
      stealer_analyst: 'Stealer Analyst',
      darkweb_analyst: 'Dark Web Analyst',
      viewer: 'Viewer'
    };
    return roleNames[role] || role;
  };

  const handleUpdateUserRole = (userId, newRole) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleToggleUserStatus = (userId) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const AddUserModal = () => {
    const [newUser, setNewUser] = useState({
      firstName: '',
      lastName: '',
      email: '',
      role: 'viewer'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const user = {
        id: `user-${Date.now()}`,
        ...newUser,
        status: 'pending',
        lastLogin: null,
        createdAt: new Date(),
        emailVerified: false
      };
      setUsers([...users, user]);
      setShowAddUser(false);
      setNewUser({ firstName: '', lastName: '', email: '', role: 'viewer' });
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md mx-4">
          <h3 className="text-lg font-semibold text-white mb-4">Add New User</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">First Name</label>
              <input
                type="text"
                value={newUser.firstName}
                onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Last Name</label>
              <input
                type="text"
                value={newUser.lastName}
                onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Role</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="viewer">Viewer</option>
                <option value="stealer_analyst">Stealer Analyst</option>
                <option value="darkweb_analyst">Dark Web Analyst</option>
                <option value="analyst">Security Analyst</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowAddUser(false)}
                className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-slate-400 mt-1">Manage users and their permissions</p>
        </div>
        <button
          onClick={() => setShowAddUser(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="admin">Administrator</option>
                <option value="analyst">Security Analyst</option>
                <option value="stealer_analyst">Stealer Analyst</option>
                <option value="darkweb_analyst">Dark Web Analyst</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="text-left p-4 text-slate-300 font-semibold">User</th>
                <th className="text-left p-4 text-slate-300 font-semibold">Role</th>
                <th className="text-left p-4 text-slate-300 font-semibold">Status</th>
                <th className="text-left p-4 text-slate-300 font-semibold">Last Login</th>
                <th className="text-left p-4 text-slate-300 font-semibold">Permissions</th>
                <th className="text-left p-4 text-slate-300 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t border-slate-700/50 hover:bg-slate-700/30">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-white">
                          {user.firstName[0]}{user.lastName[0]}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-slate-400 flex items-center space-x-2">
                          <Mail className="h-3 w-3" />
                          <span>{user.email}</span>
                          {user.emailVerified ? (
                            <CheckCircle className="h-3 w-3 text-green-400" />
                          ) : (
                            <XCircle className="h-3 w-3 text-red-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                      disabled={user.id === currentUser.uid}
                      className={`px-3 py-1 rounded-lg text-xs font-medium border ${roleColors[user.role]} ${
                        user.id === currentUser.uid
                          ? 'opacity-50 cursor-not-allowed'
                          : 'cursor-pointer hover:opacity-80'
                      } bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="viewer">Viewer</option>
                      <option value="stealer_analyst">Stealer Analyst</option>
                      <option value="darkweb_analyst">Dark Web Analyst</option>
                      <option value="analyst">Security Analyst</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        user.status === 'active' ? 'bg-green-400' :
                        user.status === 'inactive' ? 'bg-red-400' : 'bg-yellow-400'
                      }`}></div>
                      <span className={`text-sm font-medium ${statusColors[user.status]}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-slate-300">
                      {user.lastLogin ? (
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{user.lastLogin.toLocaleDateString()}</span>
                        </div>
                      ) : (
                        <span className="text-slate-500">Never</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {getRolePermissions(user.role).slice(0, 3).map((permission) => (
                        <span
                          key={permission}
                          className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded"
                        >
                          {permission.split('_').map(word =>
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </span>
                      ))}
                      {getRolePermissions(user.role).length > 3 && (
                        <span className="px-2 py-1 bg-slate-600 text-slate-400 text-xs rounded">
                          +{getRolePermissions(user.role).length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleUserStatus(user.id)}
                        disabled={user.id === currentUser.uid}
                        className={`p-2 rounded-lg transition-colors ${
                          user.id === currentUser.uid
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-slate-700 text-slate-400 hover:text-white'
                        }`}
                        title={user.status === 'active' ? 'Deactivate User' : 'Activate User'}
                      >
                        {user.status === 'active' ? (
                          <XCircle className="h-4 w-4" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
                        title="More Actions"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Permissions Reference */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Role Permissions Reference</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(ROLES).map((role) => (
            <div key={role} className={`p-4 rounded-lg border ${roleColors[role]}`}>
              <h4 className="font-semibold mb-2">{getRoleDisplayName(role)}</h4>
              <ul className="text-xs space-y-1">
                {getRolePermissions(role).map((permission) => (
                  <li key={permission} className="flex items-center space-x-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>
                      {permission.split('_').map(word =>
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && <AddUserModal />}
    </div>
  );
};

export default UserManagement;