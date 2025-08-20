const fs = require('fs');

// Đọc và xử lý dữ liệu địa chỉ từ file JSON
function processAddressData() {
  try {
    console.log('Đang xử lý dữ liệu địa chỉ...');
    
    // Đọc file JSON
    const rawData = fs.readFileSync('./temp_address_data.json', 'utf8');
    const data = JSON.parse(rawData);
    
    console.log(`Đã tải ${data.length} tỉnh/thành phố`);
    
    // Xử lý provinces
    const provinces = data.map(province => ({
      code: province.Id,
      name: province.Name
    }));
    
    // Xử lý districts
    const districts = {};
    const wards = {};
    
    data.forEach(province => {
      if (province.Districts && Array.isArray(province.Districts)) {
        districts[province.Id] = province.Districts.map(district => ({
          code: district.Id,
          name: district.Name,
          provinceCode: province.Id
        }));
        
        // Xử lý wards
        province.Districts.forEach(district => {
          if (district.Wards && Array.isArray(district.Wards)) {
            wards[district.Id] = district.Wards.map(ward => ({
              code: ward.Id,
              name: ward.Name,
              districtCode: district.Id
            }));
          }
        });
      }
    });
    
    console.log(`Đã xử lý ${Object.keys(districts).length} tỉnh có dữ liệu quận/huyện`);
    console.log(`Đã xử lý ${Object.keys(wards).length} quận/huyện có dữ liệu xã/phường`);
    
    // Tạo file JS với dữ liệu đầy đủ
    const jsContent = `// Dữ liệu địa chỉ Việt Nam đầy đủ (Offline)
// Được tạo tự động từ dữ liệu thực tế

export const provinces = ${JSON.stringify(provinces, null, 2)};

export const districts = ${JSON.stringify(districts, null, 2)};

export const wards = ${JSON.stringify(wards, null, 2)};

// Helper functions
export const getProvinces = () => {
  return Promise.resolve(provinces);
};

export const getDistricts = (provinceCode) => {
  return Promise.resolve(districts[provinceCode] || []);
};

export const getWards = (districtCode) => {
  return Promise.resolve(wards[districtCode] || []);
};

// Function to search by name
export const searchProvinces = (searchTerm) => {
  const filtered = provinces.filter(province => 
    province.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return Promise.resolve(filtered);
};

export const searchDistricts = (provinceCode, searchTerm) => {
  const provinceDistricts = districts[provinceCode] || [];
  const filtered = provinceDistricts.filter(district => 
    district.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return Promise.resolve(filtered);
};

export const searchWards = (districtCode, searchTerm) => {
  const districtWards = wards[districtCode] || [];
  const filtered = districtWards.filter(ward => 
    ward.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return Promise.resolve(filtered);
};

export default {
  provinces,
  districts,
  wards,
  getProvinces,
  getDistricts,
  getWards,
  searchProvinces,
  searchDistricts,
  searchWards
};`;
    
    // Lưu file
    fs.writeFileSync('./src/data/vietnamAddressComplete.js', jsContent, 'utf8');
    
    // Lưu thêm file JSON backup
    fs.writeFileSync('./src/data/vietnamAddressData.json', JSON.stringify({
      provinces,
      districts,
      wards
    }, null, 2), 'utf8');
    
    console.log('✅ Đã tạo file dữ liệu địa chỉ thành công!');
    console.log('📁 Files đã tạo:');
    console.log('  - src/data/vietnamAddressComplete.js');
    console.log('  - src/data/vietnamAddressData.json');
    
    // Thống kê
    console.log('\n📊 Thống kê dữ liệu:');
    console.log(`  - Tỉnh/Thành phố: ${provinces.length}`);
    console.log(`  - Quận/Huyện: ${Object.values(districts).reduce((sum, arr) => sum + arr.length, 0)}`);
    console.log(`  - Xã/Phường: ${Object.values(wards).reduce((sum, arr) => sum + arr.length, 0)}`);
    
  } catch (error) {
    console.error('❌ Lỗi khi xử lý dữ liệu:', error);
  }
}

processAddressData();
