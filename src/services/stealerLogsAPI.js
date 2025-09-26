const API_BASE_URL = '/api/v1'; // Using proxy

// Mock data based on your JSON structure
const MOCK_STEALER_DATA = [
  {
    machine_id: "78166d42-8023-4443-b19f-8d1946af4f4f",
    stealer_family: "Unknown",
    ip_address: "37.202.72.213",
    malware_path: "C:\\Windows\\SysWOW64\\explorer.exe",
    date_compromised: "Unknown",
    operating_system: "Windows",
    computer_name: "Unknown",
    installed_anti_viruses: [],
    hwid: "E645F0A24C980FCB63D149A10B4F5003",
    ram_size: "16384MB",
    cpu_vendor: "",
    cpu_name: "12th Gen Intel(R) Core(TM) i5-12450H",
    cpu_threads: "12",
    cpu_cores: "6",
    gpu: "",
    display_resolution: "1920x1080",
    install_date: "16",
    country: "Jordan",
    applications: ["SharePoint", "Outlook", "Facebook"],
    credentials: [
      {
        url: "https://accounts.google.com/v3/signin/challenge/pwd",
        login: "secum0102@gmail.com",
        password: "0780325106Rr",
        strength: "Weak"
      },
      {
        url: "https://authenticate.riotgames.com/",
        login: "raafiq97",
        password: "rafiqnihad97",
        strength: "Weak"
      }
    ],
    browsers: {}
  },
  {
    machine_id: "f53660d0-437b-4a2f-97bc-13586eafb81e",
    stealer_family: "Unknown",
    ip_address: "49.228.32.207",
    malware_path: "C:\\Windows\\SysWOW64\\explorer.exe",
    date_compromised: "Unknown",
    operating_system: "Windows",
    computer_name: "boy2521",
    installed_anti_viruses: [],
    hwid: "C9F9271ADDE0A503BA083B026F13D5E4",
    ram_size: "4096MB",
    cpu_vendor: "",
    cpu_name: "Intel(R) Core(TM) i3-4350 CPU @ 3.60GHz",
    cpu_threads: "4",
    cpu_cores: "2",
    gpu: "",
    display_resolution: "1920x1080",
    install_date: "32",
    country: "Thailand",
    applications: ["SharePoint", "Outlook", "Facebook"],
    credentials: [
      {
        url: "https://member.lazada.co.th/user/login",
        login: "warasak116@thaieei.com",
        password: "boy2521",
        strength: "Weak"
      }
    ],
    browsers: {
      Chrome: { cookies: [] },
      Edge: { cookies: [] }
    }
  },
  {
    machine_id: "b61860b0-0054-4cf8-ad24-be2954984cdd",
    stealer_family: "Unknown",
    ip_address: "41.220.201.169",
    malware_path: "C:\\Users\\Nelson\\AppData\\Local\\Temp\\1013949001\\Fuckman1222.exe",
    date_compromised: "Unknown",
    operating_system: "Unknown",
    computer_name: "Unknown",
    installed_anti_viruses: [],
    hwid: "530B17E9306674039EF26D30D1BCE101",
    ram_size: "6144MB",
    cpu_vendor: "",
    cpu_name: "Intel(R) Core(TM) i5-2400 CPU @ 3.10GHz",
    cpu_threads: "4",
    cpu_cores: "4",
    gpu: "",
    display_resolution: "1920x1080",
    install_date: "19",
    country: "Mozambique",
    applications: ["SharePoint", "Outlook", "Facebook"],
    credentials: [],
    browsers: {
      Edge: { cookies: [] }
    }
  }
];

export const fetchStealerLogs = async (filters = {}) => {
  const { search = '', country = 'all', start = 0, max = 50 } = filters;
  
  // TODO: Replace with actual API endpoint
  const url = `${API_BASE_URL}/stealer-logs?search=${search}&country=${country}&start=${start}&max=${max}`;
  
  console.log('🔵 Stealer Logs API Call:', url);
  
  try {
    // Uncomment when API is ready
    // const response = await fetch(url);
    // if (!response.ok) throw new Error(`HTTP ${response.status}`);
    // const data = await response.json();
    // return data;
    
    // For now, return mock data
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    let filteredData = [...MOCK_STEALER_DATA];
    
    // Apply search filter
    if (search) {
      filteredData = filteredData.filter(item => 
        item.computer_name?.toLowerCase().includes(search.toLowerCase()) ||
        item.ip_address?.includes(search) ||
        item.country?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply country filter
    if (country !== 'all') {
      filteredData = filteredData.filter(item => item.country === country);
    }
    
    return {
      status: 'ok',
      total: filteredData.length,
      data: filteredData.slice(start, start + max)
    };
    
  } catch (error) {
    console.error('❌ Stealer Logs API Error:', error);
    throw error;
  }
};

export const fetchStealerStats = async () => {
  // Mock stats
  return {
    totalMachines: 125000,
    totalCredentials: 2100000,
    uniqueCountries: 185,
    weakPasswords: 1850000
  };
};