import { Input, Button, Select, message } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import "../App/App.css";

function InputComponent({ onTinhToan, offShowKetQua }) {
  const [data, setData] = useState("");
  const [khach, setKhach] = useState("khach1");
  const [gioiTinh, setGioiTinh] = useState("nam");

  const handleKiemLoi = () => {
    console.log("Khách:", khach);
    console.log("Lựa chọn:", gioiTinh);
    console.log(data);

    message.success("Kiểm lỗi thành công");
  };

  const handleTinhToan = () => {
    onTinhToan?.();
    message.success("Tính toán xong");
  };

  const handleThemMoi = () => {
    setData("");
    setKhach("khach1");
    setGioiTinh("nam");
    offShowKetQua?.();

    message.success("Thêm mới thành công");
  };

  return (
    <div className="input-container">
      <div className="select-group">
        <Select
          value={khach}
          onChange={setKhach}
          options={[
            { value: "khach1", label: "Khách 1" },
            { value: "khach2", label: "Khách 2" },
          ]}
          aria-label="Chọn khách"
        />

        <Select
          value={gioiTinh}
          onChange={setGioiTinh}
          options={[
            { value: "nam", label: "Nam" },
            { value: "trung", label: "Trung" },
            { value: "bac", label: "Bắc" },
          ]}
          aria-label="Chọn khu vực"
        />
      </div>

      <div className="button-group">
        <Button type="primary" onClick={handleKiemLoi}>
          Duyệt tin
        </Button>

        <Button onClick={handleTinhToan}>Tính toán</Button>
      </div>

      {/* <div className="input-box">
        <Input.TextArea
          rows={10}
          value={data}
          placeholder="Nhập dữ liệu..."
          onChange={(e) => setData(e.target.value)}
        />
      </div> */}

      <div className="add-button-container">
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="large"
          onClick={handleThemMoi}
          aria-label="Thêm dữ liệu"
        />
      </div>
    </div>
  );
}

export default InputComponent;
