import { useState } from "react";
import { Layout, Drawer, Button, Menu, Input, message } from "antd";
import {
  MenuOutlined,
  CopyOutlined,
  TeamOutlined,
  TrophyOutlined,
  BarChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./App.css";

const { Header, Content } = Layout;
const { TextArea } = Input;

function App() {
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [returnedText, setReturnedText] = useState("");
  const [remainingText, setRemainingText] = useState("");

  const menuItems = [
    { key: "khach", icon: <TeamOutlined />, label: "Danh mục khách" },
    { key: "ketqua", icon: <TrophyOutlined />, label: "Kết quả" },
    { key: "baocao", icon: <BarChartOutlined />, label: "Báo cáo tổng" },
    { key: "tuychinh", icon: <SettingOutlined />, label: "Tùy chỉnh" },
  ];

  const handleCopy = async (text, label) => {
    if (!text.trim()) {
      message.warning(`${label} đang trống`);
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      message.success(`Đã sao chép ${label}`);
    } catch {
      message.error(
        "Không thể sao chép. Hãy mở website bằng HTTPS hoặc localhost.",
      );
    }
  };

  const handleDuyetTin = () => {
    if (!inputText.trim()) {
      message.warning("Vui lòng nhập dữ liệu!");
      return;
    }

    // Nối hàm duyệt tin hiện có của bạn tại đây.
    message.success("Đã nhận dữ liệu để duyệt");
  };

  const handleTinhToan = () => {
    if (!inputText.trim()) {
      message.warning("Vui lòng nhập dữ liệu!");
      return;
    }

    // TODO: Gọi hàm xử lý dữ liệu hiện có tại đây.
    // Ví dụ: lấy kết quả xử lý và cập nhật:
    // setReturnedText(ketQua);
    // setRemainingText(conLai);

    message.info("Hãy nối hàm tính toán hiện có vào handleTinhToan");
  };

  const handleThemMoi = () => {
    setInputText("");
    setReturnedText("");
    setRemainingText("");
    message.success("Đã làm mới dữ liệu");
  };

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <Button
          className="menu-button"
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setOpen(true)}
          aria-label="Mở menu"
        />

        <div className="app-logo">pro399</div>
      </Header>

      <Content className="app-content">
        <div className="workspace">
          <div className="action-row">
            <Button type="primary" onClick={handleDuyetTin}>
              Button 1
            </Button>

            <Button onClick={handleTinhToan}>Button 2</Button>

            <Button className="clear-button" onClick={handleThemMoi}>
              Làm mới
            </Button>
          </div>

          <section className="data-panel input-panel">
            <div className="panel-heading">Nhập vào</div>

            <TextArea
              className="data-textarea"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Nhập dữ liệu tại đây..."
              autoSize={{ minRows: 6, maxRows: 16 }}
            />

            <Button
              className="copy-button"
              icon={<CopyOutlined />}
              onClick={() => handleCopy(inputText, "nội dung nhập")}
            >
              Sao chép
            </Button>
          </section>

          <section className="data-panel">
            <div className="panel-heading">Trả về</div>

            <TextArea
              className="data-textarea"
              value={returnedText}
              onChange={(e) => setReturnedText(e.target.value)}
              placeholder="Kết quả sẽ hiển thị tại đây..."
              autoSize={{ minRows: 5, maxRows: 16 }}
            />

            <Button
              className="copy-button"
              icon={<CopyOutlined />}
              onClick={() => handleCopy(returnedText, "kết quả trả về")}
            >
              Sao chép
            </Button>
          </section>

          <section className="data-panel">
            <div className="panel-heading">Còn lại</div>

            <TextArea
              className="data-textarea"
              value={remainingText}
              onChange={(e) => setRemainingText(e.target.value)}
              placeholder="Dữ liệu còn lại sẽ hiển thị tại đây..."
              autoSize={{ minRows: 4, maxRows: 16 }}
            />

            <Button
              className="copy-button"
              icon={<CopyOutlined />}
              onClick={() => handleCopy(remainingText, "dữ liệu còn lại")}
            >
              Sao chép
            </Button>
          </section>
        </div>
      </Content>

      <Drawer
        title="Menu"
        placement="left"
        open={open}
        onClose={() => setOpen(false)}
        size={300}
        styles={{ wrapper: { maxWidth: "85vw" } }}
      >
        <Menu
          mode="vertical"
          items={menuItems}
          onClick={() => setOpen(false)}
        />
      </Drawer>
    </Layout>
  );
}

export default App;
