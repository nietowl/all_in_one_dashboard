import { apiClient, cachedRequest } from './httpClient';

// Darkweb Forums API
export const fetchForumPosts = async (filters) => {
  const { search = '', category = 'all', start = 1, max = 50 } = filters;
  const cacheKey = `forum_posts_${JSON.stringify(filters)}`;

  return cachedRequest(cacheKey, async () => {
    try {
      const response = await apiClient.get('/darkweb/forums', {
        params: { search, category, start, max }
      });

      return response.data;
    } catch (error) {
      console.error('❌ Forums API Error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch forum posts');
    }
  });
};

// Telegram Channels API
export const fetchTelegramChannels = async (filters) => {
  const { search = '', type = 'all', start = 1, max = 50 } = filters;
  const cacheKey = `telegram_channels_${JSON.stringify(filters)}`;

  return cachedRequest(cacheKey, async () => {
    try {
      const response = await apiClient.get('/darkweb/telegram', {
        params: { search, type, start, max }
      });

      return response.data;
    } catch (error) {
      console.error('❌ Telegram API Error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch telegram channels');
    }
  });
};

// Get Darkweb Statistics
export const fetchDarkwebStats = async () => {
  const cacheKey = 'darkweb_stats';

  return cachedRequest(cacheKey, async () => {
    try {
      const response = await apiClient.get('/darkweb/stats');
      return response.data;
    } catch (error) {
      console.warn('Darkweb Stats API not available, using mock data:', error.message);

      // Return mock data as fallback
      return {
        totalForumPosts: 125000,
        totalTelegramChannels: 8500,
        activeSources: 47,
        recentBreaches: 12
      };
    }
  });
};

export const searchDarkwebContent = async (searchTerm, filters = {}, start = 1, max = 50) => {
  try {
    const response = await apiClient.get('/darkweb/search', {
      params: {
        q: searchTerm,
        ...filters,
        start,
        max
      }
    });

    return response.data;
  } catch (error) {
    console.error('❌ Search Darkweb Content API Error:', error);
    throw new Error(error.response?.data?.message || 'Failed to search darkweb content');
  }
};

export const exportDarkwebData = async (filters = {}, format = 'csv') => {
  try {
    const response = await apiClient.post('/darkweb/export', {
      filters,
      format
    }, {
      responseType: 'blob'
    });

    return response.data;
  } catch (error) {
    console.error('❌ Export Darkweb Data API Error:', error);
    throw new Error(error.response?.data?.message || 'Failed to export darkweb data');
  }
};