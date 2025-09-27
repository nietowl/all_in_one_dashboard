import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { organizationAPI } from '../../services/organizationAPI';

// Async thunks
export const fetchOrganizationData = createAsyncThunk(
  'organization/fetchData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      if (!auth.user?.organizationId) {
        throw new Error('No organization ID available');
      }

      const response = await organizationAPI.getOrganizationData(auth.user.organizationId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrganizationSettings = createAsyncThunk(
  'organization/updateSettings',
  async (settings, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await organizationAPI.updateSettings(auth.user.organizationId, settings);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const inviteUser = createAsyncThunk(
  'organization/inviteUser',
  async ({ email, role }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await organizationAPI.inviteUser(auth.user.organizationId, email, role);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOrganizationUsers = createAsyncThunk(
  'organization/fetchUsers',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await organizationAPI.getUsers(auth.user.organizationId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: null,
  settings: {
    name: '',
    description: '',
    maxUsers: 10,
    features: [],
    subscription: 'basic'
  },
  users: [],
  invitations: [],
  stats: {
    totalUsers: 0,
    activeUsers: 0,
    apiCalls: 0,
    dataUsage: 0
  },
  limits: {
    maxApiCallsPerDay: 1000,
    maxDataStorageGB: 10,
    maxUsers: 10
  },
  isLoading: false,
  error: null,
};

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    updateUserRole: (state, action) => {
      const { userId, role } = action.payload;
      const user = state.users.find(u => u.id === userId);
      if (user) {
        user.role = role;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch organization data
      .addCase(fetchOrganizationData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrganizationData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.settings = action.payload.settings;
        state.stats = action.payload.stats;
        state.limits = action.payload.limits;
        state.error = null;
      })
      .addCase(fetchOrganizationData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update organization settings
      .addCase(updateOrganizationSettings.fulfilled, (state, action) => {
        state.settings = { ...state.settings, ...action.payload };
      })
      .addCase(updateOrganizationSettings.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Invite user
      .addCase(inviteUser.fulfilled, (state, action) => {
        state.invitations.push(action.payload);
      })
      .addCase(inviteUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Fetch users
      .addCase(fetchOrganizationUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchOrganizationUsers.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError, updateStats, removeUser, updateUserRole } = organizationSlice.actions;
export default organizationSlice.reducer;