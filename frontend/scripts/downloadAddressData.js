// Script để tải dữ liệu địa chỉ Việt Nam từ API và lưu vào file JSON
const fs = require('fs');
const https = require('https');

async function fetchAddressData() {
  return new Promise((resolve, reject) => {
    const url = 'https://provinces.open-api.vn/api/?depth=3';
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

async function main() {
  try {
    console.log('Đang tải dữ liệu địa chỉ Việt Nam...');
    const addressData = await fetchAddressData();
    
    // Tạo structure cho provinces, districts, wards
    const provinces = addressData.map(province => ({
      code: province.code,
      name: province.name
    }));
    
    const districts = {};
    const wards = {};
    
    addressData.forEach(province => {
      if (province.districts && province.districts.length > 0) {
        districts[province.code] = province.districts.map(district => ({
          code: district.code,
          name: district.name,
          provinceCode: province.code
        }));
        
        province.districts.forEach(district => {
          if (district.wards && district.wards.length > 0) {
            wards[district.code] = district.wards.map(ward => ({
              code: ward.code,
              name: ward.name,
              districtCode: district.code
            }));
          }
        });
      }
    });
    
    // Tạo file data
    const outputData = {
      provinces,
      districts,
      wards,
      // Helper functions as strings
      getProvinces: `() => Promise.resolve(provinces)`,
      getDistricts: `(provinceCode) => Promise.resolve(districts[provinceCode] || [])`,
      getWards: `(districtCode) => Promise.resolve(wards[districtCode] || [])`
    };
    
    // Lưu vào file JSON
    fs.writeFileSync('./src/data/vietnamAddressData.json', JSON.stringify(outputData, null, 2), 'utf8');
    
    // Tạo file JS với export
    const jsContent = `// Dữ liệu địa chỉ Việt Nam (Offline)
// Được tạo tự động từ API: https://provinces.open-api.vn/

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

export default {
  provinces,
  districts,
  wards,
  getProvinces,
  getDistricts,
  getWards
};`;
    
    fs.writeFileSync('./src/data/vietnamAddressComplete.js', jsContent, 'utf8');
    
    console.log('✅ Đã tải xong dữ liệu địa chỉ!');
    console.log(`📊 Tổng số tỉnh/thành: ${provinces.length}`);
    console.log(`📊 Tổng số quận/huyện: ${Object.keys(districts).length}`);
    console.log(`📊 Tổng số xã/phường: ${Object.keys(wards).length}`);
    console.log('📁 Files đã tạo:');
    console.log('  - src/data/vietnamAddressData.json');
    console.log('  - src/data/vietnamAddressComplete.js');
    
  } catch (error) {
    console.error('❌ Lỗi khi tải dữ liệu:', error);
  }
}

main();
