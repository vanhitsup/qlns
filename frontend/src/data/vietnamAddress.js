// Dữ liệu địa chỉ Việt Nam (Tỉnh, Huyện, Xã)
// Source: https://provinces.open-api.vn/

export const provinces = [
  { code: "01", name: "Thành phố Hà Nội" },
  { code: "79", name: "Thành phố Hồ Chí Minh" },
  { code: "31", name: "Thành phố Hải Phòng" },
  { code: "48", name: "Thành phố Đà Nẵng" },
  { code: "92", name: "Thành phố Cần Thơ" },
  { code: "02", name: "Tỉnh Hà Giang" },
  { code: "04", name: "Tỉnh Cao Bằng" },
  { code: "06", name: "Tỉnh Bắc Kạn" },
  { code: "08", name: "Tỉnh Tuyên Quang" },
  { code: "10", name: "Tỉnh Lào Cai" },
  { code: "11", name: "Tỉnh Điện Biên" },
  { code: "12", name: "Tỉnh Lai Châu" },
  { code: "14", name: "Tỉnh Sơn La" },
  { code: "15", name: "Tỉnh Yên Bái" },
  { code: "17", name: "Tỉnh Hoà Bình" },
  { code: "19", name: "Tỉnh Thái Nguyên" },
  { code: "20", name: "Tỉnh Lạng Sơn" },
  { code: "22", name: "Tỉnh Quảng Ninh" },
  { code: "24", name: "Tỉnh Bắc Giang" },
  { code: "25", name: "Tỉnh Phú Thọ" },
  { code: "26", name: "Tỉnh Vĩnh Phúc" },
  { code: "27", name: "Tỉnh Bắc Ninh" },
  { code: "30", name: "Tỉnh Hải Dương" },
  { code: "33", name: "Tỉnh Hưng Yên" },
  { code: "34", name: "Tỉnh Thái Bình" },
  { code: "35", name: "Tỉnh Hà Nam" },
  { code: "36", name: "Tỉnh Nam Định" },
  { code: "37", name: "Tỉnh Ninh Bình" },
  { code: "38", name: "Tỉnh Thanh Hóa" },
  { code: "40", name: "Tỉnh Nghệ An" },
  { code: "42", name: "Tỉnh Hà Tĩnh" },
  { code: "44", name: "Tỉnh Quảng Bình" },
  { code: "45", name: "Tỉnh Quảng Trị" },
  { code: "46", name: "Tỉnh Thừa Thiên Huế" },
  { code: "49", name: "Tỉnh Quảng Nam" },
  { code: "51", name: "Tỉnh Quảng Ngãi" },
  { code: "52", name: "Tỉnh Bình Định" },
  { code: "54", name: "Tỉnh Phú Yên" },
  { code: "56", name: "Tỉnh Khánh Hòa" },
  { code: "58", name: "Tỉnh Ninh Thuận" },
  { code: "60", name: "Tỉnh Bình Thuận" },
  { code: "62", name: "Tỉnh Kon Tum" },
  { code: "64", name: "Tỉnh Gia Lai" },
  { code: "66", name: "Tỉnh Đắk Lắk" },
  { code: "67", name: "Tỉnh Đắk Nông" },
  { code: "68", name: "Tỉnh Lâm Đồng" },
  { code: "70", name: "Tỉnh Bình Phước" },
  { code: "72", name: "Tỉnh Tây Ninh" },
  { code: "74", name: "Tỉnh Bình Dương" },
  { code: "75", name: "Tỉnh Đồng Nai" },
  { code: "77", name: "Tỉnh Bà Rịa - Vũng Tàu" },
  { code: "80", name: "Tỉnh Long An" },
  { code: "82", name: "Tỉnh Tiền Giang" },
  { code: "83", name: "Tỉnh Bến Tre" },
  { code: "84", name: "Tỉnh Trà Vinh" },
  { code: "86", name: "Tỉnh Vĩnh Long" },
  { code: "87", name: "Tỉnh Đồng Tháp" },
  { code: "89", name: "Tỉnh An Giang" },
  { code: "91", name: "Tỉnh Kiên Giang" },
  { code: "93", name: "Tỉnh Hậu Giang" },
  { code: "94", name: "Tỉnh Sóc Trăng" },
  { code: "95", name: "Tỉnh Bạc Liêu" },
  { code: "96", name: "Tỉnh Cà Mau" }
];

// Districts for Hanoi (example)
export const districts = {
  "01": [
    { code: "001", name: "Quận Ba Đình", provinceCode: "01" },
    { code: "002", name: "Quận Hoàn Kiếm", provinceCode: "01" },
    { code: "003", name: "Quận Tây Hồ", provinceCode: "01" },
    { code: "004", name: "Quận Long Biên", provinceCode: "01" },
    { code: "005", name: "Quận Cầu Giấy", provinceCode: "01" },
    { code: "006", name: "Quận Đống Đa", provinceCode: "01" },
    { code: "007", name: "Quận Hai Bà Trưng", provinceCode: "01" },
    { code: "008", name: "Quận Hoàng Mai", provinceCode: "01" },
    { code: "009", name: "Quận Thanh Xuân", provinceCode: "01" },
    { code: "016", name: "Huyện Sóc Sơn", provinceCode: "01" },
    { code: "017", name: "Huyện Đông Anh", provinceCode: "01" },
    { code: "018", name: "Huyện Gia Lâm", provinceCode: "01" },
    { code: "019", name: "Quận Nam Từ Liêm", provinceCode: "01" },
    { code: "020", name: "Huyện Thanh Trì", provinceCode: "01" },
    { code: "021", name: "Quận Bắc Từ Liêm", provinceCode: "01" },
    { code: "250", name: "Huyện Mê Linh", provinceCode: "01" },
    { code: "268", name: "Quận Hà Đông", provinceCode: "01" },
    { code: "269", name: "Thị xã Sơn Tây", provinceCode: "01" },
    { code: "271", name: "Huyện Ba Vì", provinceCode: "01" },
    { code: "272", name: "Huyện Phúc Thọ", provinceCode: "01" },
    { code: "273", name: "Huyện Đan Phượng", provinceCode: "01" },
    { code: "274", name: "Huyện Hoài Đức", provinceCode: "01" },
    { code: "275", name: "Huyện Quốc Oai", provinceCode: "01" },
    { code: "276", name: "Huyện Thạch Thất", provinceCode: "01" },
    { code: "277", name: "Huyện Chương Mỹ", provinceCode: "01" },
    { code: "278", name: "Huyện Thanh Oai", provinceCode: "01" },
    { code: "279", name: "Huyện Thường Tín", provinceCode: "01" },
    { code: "280", name: "Huyện Phú Xuyên", provinceCode: "01" },
    { code: "281", name: "Huyện Ứng Hòa", provinceCode: "01" },
    { code: "282", name: "Huyện Mỹ Đức", provinceCode: "01" }
  ],
  // Add more districts for other provinces...
};

// Wards for Ba Dinh District (example)
export const wards = {
  "001": [
    { code: "00001", name: "Phường Phúc Xá", districtCode: "001" },
    { code: "00004", name: "Phường Trúc Bạch", districtCode: "001" },
    { code: "00006", name: "Phường Vĩnh Phúc", districtCode: "001" },
    { code: "00007", name: "Phường Cống Vị", districtCode: "001" },
    { code: "00008", name: "Phường Liễu Giai", districtCode: "001" },
    { code: "00010", name: "Phường Nguyễn Trung Trực", districtCode: "001" },
    { code: "00013", name: "Phường Quán Thánh", districtCode: "001" },
    { code: "00016", name: "Phường Ngọc Hà", districtCode: "001" },
    { code: "00019", name: "Phường Điện Biên", districtCode: "001" },
    { code: "00022", name: "Phường Đội Cấn", districtCode: "001" },
    { code: "00025", name: "Phường Ngọc Khánh", districtCode: "001" },
    { code: "00028", name: "Phường Kim Mã", districtCode: "001" },
    { code: "00031", name: "Phường Giảng Võ", districtCode: "001" },
    { code: "00034", name: "Phường Thành Công", districtCode: "001" }
  ]
  // Add more wards for other districts...
};

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

// Function to fetch full data from API (one-time setup)
export const fetchFullAddressData = async () => {
  try {
    const response = await fetch('https://provinces.open-api.vn/api/?depth=3');
    const data = await response.json();
    console.log('Full address data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching address data:', error);
    return null;
  }
};
