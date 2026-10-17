import key_kieuDanh from "../components/key_kieuDanh";

function arr_TuBiLoi(input) {
  const arr_TuKhongHopLe = [];
  const arr_ThieuKDThieuST = [];
  const danhSach = input.trim().split(/\s+/);

  // Số tiền: x50, x100, x10k, x10n
  function laSoTien(tu) {
    return /^x\d+(?:k|n|d)?$/i.test(tu);
  }
  function laSoTienHopLe(tu) {
    if (!laSoTien(tu)) return false;

    // Lấy phần số, bỏ x ở đầu và hậu tố k/n/d
    const soTien = tu.slice(1).replace(/[knd]$/i, "");

    return Number(soTien) > 0;
  }

  function timSoTienKhongHopLe(input) {
    return input
      .trim()
      .split(/\s+/)
      .filter((tu) => /^x/i.test(tu) && !laSoTienHopLe(tu));
  }

  for (const tu of danhSach) {
    const chuThuong = tu.toLowerCase();

    const laKieuDanh = key_kieuDanh.includes(chuThuong);

    // Số nguyên từ 1 đến 998
    const laSoHopLe = /^\d+$/.test(tu) && Number(tu) >= 0 && Number(tu) < 999;

    // Ký tự đầu tiên phải là chữ hoặc số
    // const batDauSai = !/^[a-zA-Z0-9À-ỹ]/.test(tu);

    // Số có 1 chữ số là lỗi , ví dụ 1 , 2
    if (!laKieuDanh && !laSoTien(tu) && !laSoHopLe) {
      arr_TuKhongHopLe.push(tu);
    }
    if (tu.length === 1) {
      arr_TuKhongHopLe.push(tu);
    }

    if (timSoTienKhongHopLe(input).length > 0) {
      arr_TuKhongHopLe.push(timSoTienKhongHopLe(input)[0]);
      break;
    }
    if (!key_kieuDanh.includes(danhSach[0])) {
      arr_ThieuKDThieuST.push(danhSach[0]);
      break;
    }
    if (!/^x\d+(?:k|n|d)?$/i.test(danhSach[danhSach.length - 1])) {
      arr_ThieuKDThieuST.push(danhSach[danhSach.length - 1]);
      break;
    }
  }

  for (let i = 0; i < danhSach.length - 1; i++) {
    const tuHienTai = danhSach[i].toLowerCase();
    const tuTiepTheo = danhSach[i + 1].toLowerCase();

    const laKieuDanhHienTai = key_kieuDanh.includes(tuHienTai);
    const laKieuDanhTiepTheo = key_kieuDanh.includes(tuTiepTheo);

    const laTienHienTai = laSoTien(danhSach[i]);
    const laTienTiepTheo = laSoTien(danhSach[i + 1]);

    // Hai kiểu đánh liền kề nhau
    if (laKieuDanhHienTai && laKieuDanhTiepTheo) {
      arr_TuKhongHopLe.push(`${danhSach[i]} ${danhSach[i + 1]}`);
    }

    // Hai số tiền liền kề nhau
    if (laTienHienTai && laTienTiepTheo) {
      arr_TuKhongHopLe.push(`${danhSach[i]} ${danhSach[i + 1]}`);
    }
  }

  let viTriKieuDanh = -1;
  let coSoTien = false;

  for (let i = 0; i < danhSach.length; i++) {
    const tu = danhSach[i].toLowerCase();

    if (key_kieuDanh.includes(tu)) {
      // Gặp kiểu đánh mới: kiểm tra kiểu đánh trước
      if (viTriKieuDanh !== -1 && !coSoTien) {
        arr_TuKhongHopLe.push(
          `${danhSach.slice(viTriKieuDanh, i).join(" ")} đang có số tiền`,
        );
      }

      viTriKieuDanh = i;
      coSoTien = false;
    } else if (laSoTien(tu)) {
      coSoTien = true;
    }
  }

  // Kiểm tra kiểu đánh cuối cùng
  if (viTriKieuDanh !== -1 && !coSoTien) {
    arr_TuKhongHopLe.push(
      `${danhSach.slice(viTriKieuDanh).join(" ")} đang có số tiền`,
    );
  }
  return { arr_TuKhongHopLe, arr_ThieuKDThieuST };
}

export { arr_TuBiLoi };
export default arr_TuBiLoi;
