import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function HuongDanDangKy() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 24 }}>
      <h2>Hướng dẫn đăng ký</h2>

      <p>Đây là trang hướng dẫn đăng ký tài khoản.</p>

      <Button onClick={() => navigate("/")}>Quay lại đăng nhập</Button>
    </div>
  );
}

export default HuongDanDangKy;
