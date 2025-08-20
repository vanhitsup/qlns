import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { getProvinces, getDistricts, getWards } from '../api/provinces';

const { Option } = Select;

/**
 * Component AddressSelector - Selector địa chỉ 3 cấp
 * @param {Object} props
 * @param {Function} props.onProvinceChange - Callback khi chọn tỉnh/thành
 * @param {Function} props.onDistrictChange - Callback khi chọn quận/huyện  
 * @param {Function} props.onWardChange - Callback khi chọn xã/phường
 * @param {Object} props.value - Giá trị hiện tại {province, district, ward}
 * @param {Boolean} props.disabled - Vô hiệu hóa selector
 * @param {String} props.size - Kích thước: 'large', 'middle', 'small'
 */
const AddressSelector = ({
  onProvinceChange,
  onDistrictChange, 
  onWardChange,
  value = {},
  disabled = false,
  size = 'middle',
  placeholder = {
    province: 'Chọn Tỉnh/Thành phố',
    district: 'Chọn Quận/Huyện',
    ward: 'Chọn Xã/Phường'
  }
}) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState({
    provinces: true,
    districts: false,
    wards: false
  });

  // Load provinces khi component mount
  useEffect(() => {
    loadProvinces();
  }, []);

  // Load districts khi province thay đổi
  useEffect(() => {
    if (value.province) {
      loadDistricts(value.province);
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [value.province]);

  // Load wards khi district thay đổi
  useEffect(() => {
    if (value.district) {
      loadWards(value.district);
    } else {
      setWards([]);
    }
  }, [value.district]);

  const loadProvinces = async () => {
    try {
      setLoading(prev => ({ ...prev, provinces: true }));
      const data = await getProvinces();
      setProvinces(data);
    } catch (error) {
      console.error('Lỗi tải danh sách tỉnh/thành:', error);
    } finally {
      setLoading(prev => ({ ...prev, provinces: false }));
    }
  };

  const loadDistricts = async (provinceCode) => {
    try {
      setLoading(prev => ({ ...prev, districts: true }));
      const data = await getDistricts(provinceCode);
      setDistricts(data);
    } catch (error) {
      console.error('Lỗi tải danh sách quận/huyện:', error);
      setDistricts([]);
    } finally {
      setLoading(prev => ({ ...prev, districts: false }));
    }
  };

  const loadWards = async (districtCode) => {
    try {
      setLoading(prev => ({ ...prev, wards: true }));
      const data = await getWards(districtCode);
      setWards(data);
    } catch (error) {
      console.error('Lỗi tải danh sách xã/phường:', error);
      setWards([]);
    } finally {
      setLoading(prev => ({ ...prev, wards: false }));
    }
  };

  const handleProvinceChange = (provinceCode) => {
    onProvinceChange && onProvinceChange(provinceCode);
    // Reset district và ward
    onDistrictChange && onDistrictChange(null);
    onWardChange && onWardChange(null);
  };

  const handleDistrictChange = (districtCode) => {
    onDistrictChange && onDistrictChange(districtCode);
    // Reset ward
    onWardChange && onWardChange(null);
  };

  const handleWardChange = (wardCode) => {
    onWardChange && onWardChange(wardCode);
  };

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {/* Province Select */}
      <Select
        style={{ flex: 1, minWidth: 120 }}
        size={size}
        placeholder={placeholder.province}
        value={value.province}
        onChange={handleProvinceChange}
        loading={loading.provinces}
        disabled={disabled}
        allowClear
        showSearch
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {provinces.map((province) => (
          <Option key={province.code} value={province.code}>
            {province.name}
          </Option>
        ))}
      </Select>

      {/* District Select */}
      <Select
        style={{ flex: 1, minWidth: 120 }}
        size={size}
        placeholder={placeholder.district}
        value={value.district}
        onChange={handleDistrictChange}
        loading={loading.districts}
        disabled={disabled || !value.province}
        allowClear
        showSearch
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {districts.map((district) => (
          <Option key={district.code} value={district.code}>
            {district.name}
          </Option>
        ))}
      </Select>

      {/* Ward Select */}
      <Select
        style={{ flex: 1, minWidth: 120 }}
        size={size}
        placeholder={placeholder.ward}
        value={value.ward}
        onChange={handleWardChange}
        loading={loading.wards}
        disabled={disabled || !value.district}
        allowClear
        showSearch
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {wards.map((ward) => (
          <Option key={ward.code} value={ward.code}>
            {ward.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default AddressSelector;
