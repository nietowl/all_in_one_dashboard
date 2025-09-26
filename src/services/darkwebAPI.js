const API_BASE_URL = '/api/v1'; // Using proxy

// Darkweb Forums API
export const fetchForumPosts = async (filters) => {
  const { search = '', category = 'all', start = 1, max = 50 } = filters;
  
  // TODO: Update this URL to your actual forums API endpoint
  const url = `${API_BASE_URL}/darkweb/forums?search=${search}&category=${category}&start=${start}&max=${max}`;
  
  console.log('🔵 Darkweb Forums API Call:', url);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Forums Data:', data);
    
    return data;
  } catch (error) {
    console.error('❌ Forums API Error:', error);
    throw error;
  }
};

// Telegram Channels API
export const fetchTelegramChannels = async (filters) => {
  const { search = '', type = 'all', start = 1, max = 50 } = filters;
  
  // TODO: Update this URL to your actual telegram API endpoint
  const url = `${API_BASE_URL}/darkweb/telegram?search=${search}&type=${type}&start=${start}&max=${max}`;
  
  console.log('🔵 Telegram API Call:', url);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Telegram Data:', data);
    
    return data;
  } catch (error) {
    console.error('❌ Telegram API Error:', error);
    throw error;
  }
};

// Get Darkweb Statistics
export const fetchDarkwebStats = async () => {
  const url = `${API_BASE_URL}/darkweb/stats`;
  
  console.log('🔵 Darkweb Stats API Call:', url);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      // Return mock data if API not available
      return {
        totalForumPosts: 125000,
        totalTelegramChannels: 8500,
        activeSources: 47,
        recentBreaches: 12
      };
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Stats API Error:', error);
    // Return mock data as fallback
    return {
      totalForumPosts: 125000,
      totalTelegramChannels: 8500,
      activeSources: 47,
      recentBreaches: 12
    };
  }
};