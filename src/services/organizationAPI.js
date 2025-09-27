import axios from 'axios';

const API_BASE_URL = '/api/v1/organizations';

// Create axios instance for organization API
const orgAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const organizationAPI = {
  // Get organization data
  getOrganizationData: async (organizationId) => {
    try {
      const response = await orgAxios.get(`/${organizationId}`);
      return response.data;
    } catch (error) {
      console.error('Get organization data error:', error);
      throw new Error(error.response?.data?.message || 'Failed to get organization data');
    }
  },

  // Update organization settings
  updateSettings: async (organizationId, settings) => {
    try {
      const response = await orgAxios.put(`/${organizationId}/settings`, settings);
      return response.data;
    } catch (error) {
      console.error('Update organization settings error:', error);
      throw new Error(error.response?.data?.message || 'Failed to update organization settings');
    }
  },

  // Get organization users
  getUsers: async (organizationId, page = 1, limit = 50) => {
    try {
      const response = await orgAxios.get(`/${organizationId}/users`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Get organization users error:', error);
      throw new Error(error.response?.data?.message || 'Failed to get organization users');
    }
  },

  // Invite user to organization
  inviteUser: async (organizationId, email, role = 'viewer') => {
    try {
      const response = await orgAxios.post(`/${organizationId}/invitations`, {
        email,
        role
      });
      return response.data;
    } catch (error) {
      console.error('Invite user error:', error);
      throw new Error(error.response?.data?.message || 'Failed to invite user');
    }
  },

  // Update user role
  updateUserRole: async (organizationId, userId, role) => {
    try {
      const response = await orgAxios.put(`/${organizationId}/users/${userId}/role`, { role });
      return response.data;
    } catch (error) {
      console.error('Update user role error:', error);
      throw new Error(error.response?.data?.message || 'Failed to update user role');
    }
  },

  // Remove user from organization
  removeUser: async (organizationId, userId) => {
    try {
      const response = await orgAxios.delete(`/${organizationId}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Remove user error:', error);
      throw new Error(error.response?.data?.message || 'Failed to remove user');
    }
  },

  // Get organization statistics
  getStats: async (organizationId, dateFrom, dateTo) => {
    try {
      const response = await orgAxios.get(`/${organizationId}/stats`, {
        params: { dateFrom, dateTo }
      });
      return response.data;
    } catch (error) {
      console.error('Get organization stats error:', error);
      throw new Error(error.response?.data?.message || 'Failed to get organization stats');
    }
  },

  // Get API usage for organization
  getApiUsage: async (organizationId, period = '30d') => {
    try {
      const response = await orgAxios.get(`/${organizationId}/api-usage`, {
        params: { period }
      });
      return response.data;
    } catch (error) {
      console.error('Get API usage error:', error);
      throw new Error(error.response?.data?.message || 'Failed to get API usage');
    }
  },

  // Generate API key
  generateApiKey: async (organizationId, name, permissions = []) => {
    try {
      const response = await orgAxios.post(`/${organizationId}/api-keys`, {
        name,
        permissions
      });
      return response.data;
    } catch (error) {
      console.error('Generate API key error:', error);
      throw new Error(error.response?.data?.message || 'Failed to generate API key');
    }
  },

  // Get API keys
  getApiKeys: async (organizationId) => {
    try {
      const response = await orgAxios.get(`/${organizationId}/api-keys`);
      return response.data;
    } catch (error) {
      console.error('Get API keys error:', error);
      throw new Error(error.response?.data?.message || 'Failed to get API keys');
    }
  },

  // Revoke API key
  revokeApiKey: async (organizationId, keyId) => {
    try {
      const response = await orgAxios.delete(`/${organizationId}/api-keys/${keyId}`);
      return response.data;
    } catch (error) {
      console.error('Revoke API key error:', error);
      throw new Error(error.response?.data?.message || 'Failed to revoke API key');
    }
  },

  // Get organization invitations
  getInvitations: async (organizationId) => {
    try {
      const response = await orgAxios.get(`/${organizationId}/invitations`);
      return response.data;
    } catch (error) {
      console.error('Get invitations error:', error);
      throw new Error(error.response?.data?.message || 'Failed to get invitations');
    }
  },

  // Cancel invitation
  cancelInvitation: async (organizationId, invitationId) => {
    try {
      const response = await orgAxios.delete(`/${organizationId}/invitations/${invitationId}`);
      return response.data;
    } catch (error) {
      console.error('Cancel invitation error:', error);
      throw new Error(error.response?.data?.message || 'Failed to cancel invitation');
    }
  },

  // Accept invitation
  acceptInvitation: async (token) => {
    try {
      const response = await orgAxios.post('/invitations/accept', { token });
      return response.data;
    } catch (error) {
      console.error('Accept invitation error:', error);
      throw new Error(error.response?.data?.message || 'Failed to accept invitation');
    }
  }
};