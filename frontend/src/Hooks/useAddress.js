import { useState, useEffect } from 'react';
import { getProvinces, getDistricts, getWards } from '../api/provinces';

/**
 * Custom hook để quản lý địa chỉ 3 cấp
 * @param {Object} initialValue - Giá trị ban đầu {province, district, ward}
 * @returns {Object} - {addressData, setAddress, loading, errors}
 */
export const useAddress = (initialValue = {}) => {
  const [addressData, setAddressData] = useState({
    provinces: [],
    districts: [],
    wards: [],
    selected: {
      province: initialValue.province || null,
      district: initialValue.district || null,
      ward: initialValue.ward || null
    }
  });

  const [loading, setLoading] = useState({
    provinces: false,
    districts: false,
    wards: false
  });

  const [errors, setErrors] = useState({});

  // Load provinces khi hook khởi tạo
  useEffect(() => {
    loadProvinces();
  }, []);

  // Load districts khi province thay đổi
  useEffect(() => {
    if (addressData.selected.province) {
      loadDistricts(addressData.selected.province);
    } else {
      setAddressData(prev => ({
        ...prev,
        districts: [],
        wards: [],
        selected: {
          ...prev.selected,
          district: null,
          ward: null
        }
      }));
    }
  }, [addressData.selected.province]);

  // Load wards khi district thay đổi
  useEffect(() => {
    if (addressData.selected.district) {
      loadWards(addressData.selected.district);
    } else {
      setAddressData(prev => ({
        ...prev,
        wards: [],
        selected: {
          ...prev.selected,
          ward: null
        }
      }));
    }
  }, [addressData.selected.district]);

  const loadProvinces = async () => {
    try {
      setLoading(prev => ({ ...prev, provinces: true }));
      setErrors(prev => ({ ...prev, provinces: null }));
      
      const data = await getProvinces();
      setAddressData(prev => ({
        ...prev,
        provinces: data
      }));
    } catch (error) {
      console.error('Lỗi tải danh sách tỉnh/thành:', error);
      setErrors(prev => ({ ...prev, provinces: 'Không thể tải danh sách tỉnh/thành' }));
    } finally {
      setLoading(prev => ({ ...prev, provinces: false }));
    }
  };

  const loadDistricts = async (provinceCode) => {
    try {
      setLoading(prev => ({ ...prev, districts: true }));
      setErrors(prev => ({ ...prev, districts: null }));
      
      const data = await getDistricts(provinceCode);
      setAddressData(prev => ({
        ...prev,
        districts: data
      }));
    } catch (error) {
      console.error('Lỗi tải danh sách quận/huyện:', error);
      setErrors(prev => ({ ...prev, districts: 'Không thể tải danh sách quận/huyện' }));
    } finally {
      setLoading(prev => ({ ...prev, districts: false }));
    }
  };

  const loadWards = async (districtCode) => {
    try {
      setLoading(prev => ({ ...prev, wards: true }));
      setErrors(prev => ({ ...prev, wards: null }));
      
      const data = await getWards(districtCode);
      setAddressData(prev => ({
        ...prev,
        wards: data
      }));
    } catch (error) {
      console.error('Lỗi tải danh sách xã/phường:', error);
      setErrors(prev => ({ ...prev, wards: 'Không thể tải danh sách xã/phường' }));
    } finally {
      setLoading(prev => ({ ...prev, wards: false }));
    }
  };

  const setAddress = (type, value) => {
    setAddressData(prev => ({
      ...prev,
      selected: {
        ...prev.selected,
        [type]: value,
        // Reset children when parent changes
        ...(type === 'province' && { district: null, ward: null }),
        ...(type === 'district' && { ward: null })
      }
    }));
  };

  const resetAddress = () => {
    setAddressData(prev => ({
      ...prev,
      selected: {
        province: null,
        district: null,
        ward: null
      }
    }));
  };

  const getSelectedNames = () => {
    const { selected, provinces, districts, wards } = addressData;
    
    const provinceName = provinces.find(p => p.code === selected.province)?.name || '';
    const districtName = districts.find(d => d.code === selected.district)?.name || '';
    const wardName = wards.find(w => w.code === selected.ward)?.name || '';

    return {
      province: provinceName,
      district: districtName,
      ward: wardName,
      fullAddress: [wardName, districtName, provinceName].filter(Boolean).join(', ')
    };
  };

  return {
    addressData,
    loading,
    errors,
    setAddress,
    resetAddress,
    getSelectedNames,
    // Convenience methods
    setProvince: (value) => setAddress('province', value),
    setDistrict: (value) => setAddress('district', value),
    setWard: (value) => setAddress('ward', value)
  };
};

export default useAddress;
