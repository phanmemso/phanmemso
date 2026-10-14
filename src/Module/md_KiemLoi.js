const key_kieuDanh = ["lo", "de", "3cang", "xien", "xq"];

function boDauTiengViet(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

function chuanHoaChuoi(input) {
  let result = boDauTiengViet(input);

  // 1. Đổi ký tự phân cách thành khoảng trắng
  result = result.replace(/[.,/;:()|]+/g, " ");

  // 2. Tách x + số + hậu tố k/n/d
  // x10k -> x10k
  // x10n -> x10n
  // x10d -> x10d
  result = result.replace(/x\s*(\d+)\s*([knd])/gi, " x$1$2 ");

  // 3. Tách trường hợp x10de -> x10d de
  result = result.replace(/x(\d+)d\s*de/gi, " x$1d de ");

  // 4. Tách các kiểu đánh
  key_kieuDanh.forEach((kieudanh) => {
    const regex = new RegExp(kieudanh, "gi");

    result = result.replace(regex, ` ${kieudanh} `);
  });

  // 5. Tách chữ + số
  result = result.replace(/([a-zA-Z])(\d)/g, "$1 $2");

  // 6. Ghép lại x + số + k/n/d
  result = result.replace(/\bx\s+(\d+)\s*([knd])\b/gi, "x$1$2");

  // 7. Chuẩn hóa khoảng trắng
  result = result.replace(/\s+/g, " ").trim();

  return result;
}

console.log(chuanHoaChuoi("LÔ 78 87 x10đề 89 x100n"));

export default chuanHoaChuoi;
