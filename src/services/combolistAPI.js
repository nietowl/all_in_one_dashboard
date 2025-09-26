// Use proxy path (relative URL)
const API_BASE_URL = '/api/v1';

export const fetchCredentials = async (year, month, domain, start = 1, max = 50) => {
  const url = `${API_BASE_URL}/config/?year=${year}&month=${month}&domain=${domain}&start=${start}&max=${max}`;
  
  console.log('🔵 API Call (via proxy):', url);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    console.log('📡 Response Status:', response.status);
    console.log('📡 Response OK:', response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    console.log('✅ Data received:', data);
    console.log('✅ Entries:', data.data?.length);
    console.log('✅ Total:', data.totalEntries);
    
    return data;
  } catch (error) {
    console.error('❌ API Error:', error);
    console.error('❌ Error name:', error.name);
    console.error('❌ Error message:', error.message);
    throw error;
  }
};