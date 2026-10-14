import key_kieuDanh from "../components/key_kieuDanh";

function xuLyChuoi(input) {
  const elements = input.trim().split(/\s+/);

  const result = [];
  let current = [];

  elements.forEach((element) => {
    if (key_kieuDanh.includes(element)) {
      if (current.length > 0) {
        result.push(current.join(" "));
      }

      current = [element];
    } else {
      current.push(element);
    }
  });

  if (current.length > 0) {
    result.push(current.join(" "));
  }

  return result;
}

function xuLyChuoiCon(items) {
  const result = [];

  for (const item of items) {
    let kieudanh = "";
    let sodanh = [];

    const elements = item.trim().split(/\s+/);

    for (const element of elements) {
      // Gặp kiểu đánh
      if (key_kieuDanh.includes(element)) {
        kieudanh = element;
      }

      // Gặp số tiền: x10, x100, x15k...
      else if (element.startsWith("x")) {
        result.push({
          kieudanh: kieudanh,
          sodanh: sodanh,
          sotien: laySoTien(element),
        });

        sodanh = [];
      }

      // Gặp số
      else {
        const so = String(element);

        // 3 càng thì giữ nguyên
        if (kieudanh === "3cang") {
          sodanh.push(so);
        }

        // Các kiểu khác
        else {
          if (so.length === 3) {
            sodanh.push(so.slice(0, 2), so.slice(1, 3));
          } else {
            sodanh.push(so);
          }
        }
      }
    }
  }

  return result;
}

// "x15k" => 15
function laySoTien(str) {
  return Number(str.replace(/[^\d]/g, ""));
}

// Hàm chính
function tinhToan(inputValue) {
  return xuLyChuoiCon(xuLyChuoi(inputValue));
}

export { xuLyChuoi, xuLyChuoiCon, key_kieuDanh };
export default tinhToan;
