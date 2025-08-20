// Test script để kiểm tra dữ liệu địa chỉ offline
import { getProvinces, getDistricts, getWards } from './src/api/provinces.js';

async function testOfflineData() {
  console.log('🧪 Testing dữ liệu địa chỉ offline...\n');
  
  try {
    // Test provinces
    console.log('1️⃣ Testing provinces...');
    const provinces = await getProvinces();
    console.log(`✅ Provinces: ${provinces.length} tỉnh/thành`);
    console.log(`📝 Sample: ${provinces[0].name} (${provinces[0].code})`);
    
    // Test districts với Hà Nội
    console.log('\n2️⃣ Testing districts cho Hà Nội (01)...');
    const hanoiDistricts = await getDistricts('01');
    console.log(`✅ Hà Nội Districts: ${hanoiDistricts.length} quận/huyện`);
    console.log(`📝 Sample: ${hanoiDistricts[0]?.name} (${hanoiDistricts[0]?.code})`);
    
    // Test districts với TP HCM
    console.log('\n3️⃣ Testing districts cho TP HCM (79)...');
    const hcmDistricts = await getDistricts('79');
    console.log(`✅ TP HCM Districts: ${hcmDistricts.length} quận/huyện`);
    console.log(`📝 Sample: ${hcmDistricts[0]?.name} (${hcmDistricts[0]?.code})`);
    
    // Test wards
    if (hanoiDistricts.length > 0) {
      console.log(`\n4️⃣ Testing wards cho ${hanoiDistricts[0].name} (${hanoiDistricts[0].code})...`);
      const wards = await getWards(hanoiDistricts[0].code);
      console.log(`✅ Wards: ${wards.length} xã/phường`);
      if (wards.length > 0) {
        console.log(`📝 Sample: ${wards[0].name} (${wards[0].code})`);
      }
    }
    
    console.log('\n🎉 Test hoàn thành! Dữ liệu offline hoạt động tốt.');
    
  } catch (error) {
    console.error('❌ Lỗi trong quá trình test:', error);
  }
}

testOfflineData();
