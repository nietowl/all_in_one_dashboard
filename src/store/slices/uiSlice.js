import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  sidebarCollapsed: false,
  notifications: [],
  loading: {
    global: false,
    components: {}
  },
  errors: {
    global: null,
    components: {}
  },
  pagination: {
    combolist: { page: 1, size: 50 },
    stealerLogs: { page: 1, size: 50 },
    darkweb: { page: 1, size: 50 }
  },
  filters: {
    combolist: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      domain: '',
      search: ''
    },
    stealerLogs: {
      search: '',
      country: 'all',
      dateFrom: '',
      dateTo: ''
    },
    darkweb: {
      search: '',
      category: 'all',
      type: 'all'
    }
  },
  cache: {
    expiry: {},
    data: {}
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload
      };
      state.notifications.unshift(notification);

      // Keep only last 50 notifications
      if (state.notifications.length > 50) {
        state.notifications = state.notifications.slice(0, 50);
      }
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload;
    },
    setComponentLoading: (state, action) => {
      const { component, loading } = action.payload;
      state.loading.components[component] = loading;
    },
    setGlobalError: (state, action) => {
      state.errors.global = action.payload;
    },
    setComponentError: (state, action) => {
      const { component, error } = action.payload;
      state.errors.components[component] = error;
    },
    clearErrors: (state) => {
      state.errors.global = null;
      state.errors.components = {};
    },
    setPagination: (state, action) => {
      const { section, page, size } = action.payload;
      if (state.pagination[section]) {
        state.pagination[section] = { page, size };
      }
    },
    setFilters: (state, action) => {
      const { section, filters } = action.payload;
      if (state.filters[section]) {
        state.filters[section] = { ...state.filters[section], ...filters };
      }
    },
    clearFilters: (state, action) => {
      const section = action.payload;
      if (state.filters[section]) {
        state.filters[section] = initialState.filters[section];
      }
    },
    setCacheData: (state, action) => {
      const { key, data, expiryMinutes = 5 } = action.payload;
      const expiry = new Date(Date.now() + expiryMinutes * 60 * 1000);

      state.cache.data[key] = data;
      state.cache.expiry[key] = expiry.toISOString();
    },
    getCacheData: (state, action) => {
      const key = action.payload;
      const expiry = state.cache.expiry[key];

      if (expiry && new Date() > new Date(expiry)) {
        // Cache expired, remove it
        delete state.cache.data[key];
        delete state.cache.expiry[key];
        return null;
      }

      return state.cache.data[key] || null;
    },
    clearCache: (state, action) => {
      if (action.payload) {
        // Clear specific cache key
        delete state.cache.data[action.payload];
        delete state.cache.expiry[action.payload];
      } else {
        // Clear all cache
        state.cache.data = {};
        state.cache.expiry = {};
      }
    }
  },
});

export const {
  setTheme,
  toggleSidebar,
  setSidebarCollapsed,
  addNotification,
  removeNotification,
  clearNotifications,
  setGlobalLoading,
  setComponentLoading,
  setGlobalError,
  setComponentError,
  clearErrors,
  setPagination,
  setFilters,
  clearFilters,
  setCacheData,
  getCacheData,
  clearCache
} = uiSlice.actions;

export default uiSlice.reducer;