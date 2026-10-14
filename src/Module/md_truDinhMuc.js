//hàm này trả về 2 mảng
//sauDinhMuc
//conLai

function truDinhMuc(data, dinhMuc) {
  const conLai = [];
  const guiDi = [];

  data.forEach((item) => {
    const muc = dinhMuc[item.kieudanh];

    // Không có định mức: giữ nguyên dữ liệu
    if (muc === undefined) {
      conLai.push(item);
      guiDi.push(item);
      return;
    }

    // Tiền vượt định mức
    if (item.sotien > muc) {
      // Phần trong định mức
      conLai.push({
        ...item,
        sotien: muc,
      });

      // Phần vượt định mức
      guiDi.push({
        ...item,
        sotien: item.sotien - muc,
      });
    } else {
      // Không vượt định mức: giữ nguyên
      conLai.push(item);
    }
  });

  return {
    conLai,
    guiDi,
  };
}

export default truDinhMuc;
