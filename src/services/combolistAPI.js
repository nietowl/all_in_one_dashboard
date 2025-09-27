import { apiClient, cachedRequest } from './httpClient';

export const fetchCredentials = async (year, month, domain, start = 1, max = 50) => {
  const cacheKey = `credentials_${year}_${month}_${domain}_${start}_${max}`;

  return cachedRequest(cacheKey, async () => {
    try {
      const response = await apiClient.get('/combolist/credentials', {
        params: { year, month, domain, start, max }
      });

      return response.data;
    } catch (error) {
      console.error('❌ Credentials API Error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch credentials');
    }
  });
};

export const fetchCombolistStats = async (filters = {}) => {
  const cacheKey = `combolist_stats_${JSON.stringify(filters)}`;

  return cachedRequest(cacheKey, async () => {
    try {
      const response = await apiClient.get('/combolist/stats', {
        params: filters
      });

      return response.data;
    } catch (error) {
      console.error('❌ Combolist Stats API Error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch combolist stats');
    }
  });
};

export const searchCredentials = async (searchTerm, filters = {}, start = 1, max = 50) => {
  try {
    const response = await apiClient.get('/combolist/search', {
      params: {
        q: searchTerm,
        ...filters,
        start,
        max
      }
    });

    return response.data;
  } catch (error) {
    console.error('❌ Search Credentials API Error:', error);
    throw new Error(error.response?.data?.message || 'Failed to search credentials');
  }
};

export const exportCredentials = async (filters = {}, format = 'csv') => {
  try {
    const response = await apiClient.post('/combolist/export', {
      filters,
      format
    }, {
      responseType: 'blob'
    });

    return response.data;
  } catch (error) {
    console.error('❌ Export Credentials API Error:', error);
    throw new Error(error.response?.data?.message || 'Failed to export credentials');
  }
};