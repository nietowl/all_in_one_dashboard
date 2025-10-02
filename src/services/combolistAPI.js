import {
  fetchStealerCredentials,
  fetchStealerStats,
  searchStealerCredentials,
  exportStealerCredentials,
  cachedStealerRequest
} from './stealerIntelAPI';

// Updated to use stealer intelligence API
export const fetchCredentials = async (year, month, domain, start = 1, max = 50) => {
  const cacheKey = `stealer_credentials_${year}_${month}_${domain}_${start}_${max}`;

  return cachedStealerRequest(cacheKey, async () => {
    try {
      console.log('🔄 Fetching credentials via stealer intelligence API...');
      return await fetchStealerCredentials(year, month, domain, start, max);
    } catch (error) {
      console.error('❌ Stealer Credentials API Error:', error);

      // Fallback to mock data if external API fails
      console.log('🔄 Falling back to mock data...');
      return {
        data: [],
        totalEntries: 0,
        returnedEntries: 0,
        message: 'External API unavailable - showing mock data',
        passwordType: 'Mixed'
      };
    }
  });
};

export const fetchCombolistStats = async (filters = {}) => {
  const cacheKey = `stealer_stats_${JSON.stringify(filters)}`;

  return cachedStealerRequest(cacheKey, async () => {
    try {
      console.log('🔄 Fetching stats via stealer intelligence API...');
      return await fetchStealerStats(filters);
    } catch (error) {
      console.error('❌ Stealer Stats API Error:', error);

      // Fallback to mock stats if external API fails
      console.log('🔄 Falling back to mock stats...');
      return {
        totalCredentials: 0,
        totalDomains: 1,
        avgCredentialsPerDomain: 0,
        securityLevel: 'Unknown',
        lastUpdated: new Date().toISOString()
      };
    }
  });
};

export const searchCredentials = async (searchTerm, filters = {}, start = 1, max = 50) => {
  try {
    console.log('🔍 Searching credentials via stealer intelligence API...');
    return await searchStealerCredentials(searchTerm, filters, start, max);
  } catch (error) {
    console.error('❌ Search Stealer Credentials API Error:', error);
    throw new Error(error.message || 'Failed to search stealer credentials');
  }
};

export const exportCredentials = async (filters = {}, format = 'csv') => {
  try {
    console.log('📥 Exporting credentials via stealer intelligence API...');
    return await exportStealerCredentials(filters, format);
  } catch (error) {
    console.error('❌ Export Stealer Credentials API Error:', error);
    throw new Error(error.message || 'Failed to export stealer credentials');
  }
};