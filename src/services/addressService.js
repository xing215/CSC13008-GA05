// Import dữ liệu từ file JSON
import provinceData from "../assets/data/province.json"; 
import wardData from "../assets/data/ward.json";

/**
 * Hàm lấy danh sách tất cả Tỉnh/Thành phố
 * Trả về: Mảng danh sách tỉnh
 */
export const getProvinces = () => {
  return Object.values(provinceData);
};

/**
 * Hàm lấy danh sách Phường/Xã dựa trên mã Tỉnh/Thành (cityCode)
 * Trả về: Mảng danh sách phường xã thuộc tỉnh đó
 */
export const getWardsByProvinceCode = (cityCode) => {
  if (!cityCode) return [];

  const allWards = Object.values(wardData);
  return allWards.filter((ward) => ward.parent_code === cityCode);
};

/**
 * Hàm lấy tên Tỉnh từ mã code
 * Dùng để hiển thị lại tên tỉnh khi người dùng xem lại form đã submit
 */
export const getProvinceName = (code) => {
  const province = provinceData[code];
  return province ? province.name_with_type : "";
};

/**
 * Hàm lấy tên Phường từ mã code
 */
export const getWardName = (code) => {
  const ward = wardData[code];
  return ward ? ward.name_with_type : "";
};