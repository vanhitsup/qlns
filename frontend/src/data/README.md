# Hệ thống địa chỉ Việt Nam - Offline

## Mô tả
Hệ thống quản lý địa chỉ 3 cấp (Tỉnh/Thành phố - Quận/Huyện - Xã/Phường) cho Việt Nam, có thể hoạt động offline.

## Cấu trúc file

```
src/
├── data/
│   ├── vietnamAddress.js          # Dữ liệu mẫu cơ bản
│   └── vietnamAddressComplete.js  # Dữ liệu đầy đủ hơn
├── api/
│   └── provinces.js               # API với fallback sang local data
├── components/
│   └── AddressSelector/
│       └── AddressSelector.jsx    # Component selector địa chỉ
├── hooks/
│   └── useAddress.js              # Custom hook quản lý địa chỉ
└── scripts/
    └── downloadAddressData.js     # Script tải dữ liệu từ API
```

## Sử dụng

### 1. Sử dụng API (với fallback)

```javascript
import { getProvinces, getDistricts, getWards } from '../api/provinces';

// Tải tỉnh/thành
const provinces = await getProvinces();

// Tải quận/huyện theo mã tỉnh
const districts = await getDistricts('01'); // Hà Nội

// Tải xã/phường theo mã quận/huyện  
const wards = await getWards('001'); // Ba Đình
```

### 2. Sử dụng Component AddressSelector

```jsx
import AddressSelector from '../components/AddressSelector/AddressSelector';

function MyForm() {
  const [address, setAddress] = useState({
    province: null,
    district: null, 
    ward: null
  });

  return (
    <AddressSelector
      value={address}
      onProvinceChange={(code) => setAddress(prev => ({...prev, province: code}))}
      onDistrictChange={(code) => setAddress(prev => ({...prev, district: code}))}
      onWardChange={(code) => setAddress(prev => ({...prev, ward: code}))}
      size="middle"
      placeholder={{
        province: "Chọn Tỉnh/Thành phố",
        district: "Chọn Quận/Huyện", 
        ward: "Chọn Xã/Phường"
      }}
    />
  );
}
```

### 3. Sử dụng Custom Hook

```jsx
import useAddress from '../hooks/useAddress';

function MyComponent() {
  const {
    addressData,
    loading,
    errors,
    setProvince,
    setDistrict,
    setWard,
    getSelectedNames,
    resetAddress
  } = useAddress();

  const handleSubmit = () => {
    const names = getSelectedNames();
    console.log('Địa chỉ đầy đủ:', names.fullAddress);
  };

  return (
    <div>
      <Select 
        loading={loading.provinces}
        onChange={setProvince}
        value={addressData.selected.province}
      >
        {addressData.provinces.map(province => (
          <Option key={province.code} value={province.code}>
            {province.name}
          </Option>
        ))}
      </Select>
      
      {/* Tương tự cho districts và wards */}
    </div>
  );
}
```

### 4. Sử dụng dữ liệu trực tiếp

```javascript
import { 
  provinces, 
  districts, 
  wards,
  getProvinces,
  getDistricts,
  getWards 
} from '../data/vietnamAddressComplete';

// Sử dụng dữ liệu tĩnh
console.log(provinces); // Array các tỉnh/thành

// Sử dụng functions
const hanoi = await getProvinces();
const hanoiDistricts = await getDistricts('01');
const baDinhWards = await getWards('001');
```

## Tính năng

### ✅ Đã có
- ✅ Dữ liệu 63 tỉnh/thành phố Việt Nam
- ✅ Dữ liệu quận/huyện cho các thành phố lớn (Hà Nội, TP.HCM, Đà Nẵng, Hải Phòng, Cần Thơ)
- ✅ Dữ liệu xã/phường mẫu cho một số quận/huyện
- ✅ API với fallback sang dữ liệu local
- ✅ Component AddressSelector tái sử dụng được
- ✅ Custom hook useAddress
- ✅ Tìm kiếm theo tên
- ✅ Loading states
- ✅ Error handling

### 🔄 Cần bổ sung
- ⏳ Dữ liệu đầy đủ tất cả quận/huyện, xã/phường
- ⏳ Caching dữ liệu trong localStorage
- ⏳ Import/export dữ liệu
- ⏳ Validation địa chỉ

## Mở rộng dữ liệu

### Tự động tải từ API
```bash
# Chạy script tải dữ liệu
node scripts/downloadAddressData.js
```

### Thêm dữ liệu thủ công
Chỉnh sửa file `src/data/vietnamAddressComplete.js`:

```javascript
// Thêm quận/huyện cho tỉnh mới
export const districts = {
  // ... existing data
  "02": [ // Hà Giang
    { code: "024", name: "Thành phố Hà Giang", provinceCode: "02" },
    { code: "026", name: "Huyện Đồng Văn", provinceCode: "02" },
    // ... more districts
  ]
};

// Thêm xã/phường cho quận/huyện mới  
export const wards = {
  // ... existing data
  "024": [ // TP Hà Giang
    { code: "00688", name: "Phường Quang Trung", districtCode: "024" },
    { code: "00691", name: "Phường Trần Phú", districtCode: "024" },
    // ... more wards
  ]
};
```

## Lưu ý
- Dữ liệu hiện tại chỉ có đầy đủ cho 5 thành phố lớn
- Các tỉnh khác chỉ có dữ liệu mẫu, cần bổ sung thêm
- API fallback giúp ứng dụng vẫn hoạt động khi mất mạng
- Dữ liệu được cập nhật theo chuẩn của Tổng cục Thống kê Việt Nam
