// Import dữ liệu địa chỉ local
import { 
  getProvinces as getLocalProvinces, 
  getDistricts as getLocalDistricts, 
  getWards as getLocalWards 
} from '../data/vietnamAddressComplete.js';

// Helper function to fetch with timeout
const fetchWithTimeout = (url, options = {}) => {
  const { timeout = 3000, ...fetchOptions } = options;
  
  return Promise.race([
    fetch(url, fetchOptions),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    )
  ]);
};

// Sử dụng dữ liệu local thay vì API
export const getProvinces = async () => {
  try {
    // Thử dùng API trước với timeout 3 giây
    const res = await fetchWithTimeout('https://provinces.open-api.vn/api/p/', { timeout: 3000 });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
  }
  
  // Fallback sang dữ liệu local
  return getLocalProvinces();
};

export const getDistricts = async (provinceCode) => {
  try {
    // Thử dùng API trước với timeout 3 giây
    const res = await fetchWithTimeout(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`, { timeout: 3000 });
    if (res.ok) {
      const data = await res.json();
      return data.districts || [];
    }
  } catch (error) {
  }
  
  // Fallback sang dữ liệu local
  return getLocalDistricts(provinceCode);
};

export const getWards = async (districtCode) => {
  try {
    // Thử dùng API trước với timeout 3 giây
    const res = await fetchWithTimeout(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`, { timeout: 3000 });
    if (res.ok) {
      const data = await res.json();
      return data.wards || [];
    }
  } catch (error) {
  }
  
  // Fallback sang dữ liệu local
  return getLocalWards(districtCode);
};