import key_kieuDanh from "../components/key_kieuDanh.js";

function chuanHoaChuoi(input = "") {
  // Bước 1: Bỏ dấu tiếng Việt, chuyển chữ thường,
  // thay ký tự đặc biệt bằng dấu cách
  let result = String(input)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ");

  // Bước 2: Chèn khoảng trắng bên trái chữ x
  // Ví dụ: 190x10 -> 190 x10
  result = result.replace(/(?<=\S)x/g, " x");

  // Bước 3: Chèn khoảng trắng trước và sau kiểu đánh
  // Sắp xếp từ khóa dài đến ngắn để tránh khớp từ khóa ngắn trước
  const danhSachKieuDanh = [...key_kieuDanh]
    .map(String)
    .sort((a, b) => b.length - a.length);

  danhSachKieuDanh.forEach((kieudanh) => {
    const tuKhoa = kieudanh.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(tuKhoa, "gi");

    result = result.replace(regex, (match) => ` ${match} `);
  });

  // Bước 4: Xóa khoảng trắng đầu/cuối
  // và gom khoảng trắng liên tiếp
  result = result.trim().replace(/\s+/g, " ");

  return result;
}

export default chuanHoaChuoi;
