import { useState } from "react";
import { Layout, Drawer, Button, Menu, message } from "antd";
import {
  MenuOutlined,
  ReloadOutlined,
  CopyOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  CalculatorOutlined,
  BarChartOutlined,
  TeamOutlined,
  TrophyOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import "./App.css";

const { Header, Content } = Layout;

function App() {
  const [open, setOpen] = useState(false);

  const [inputText, setInputText] = useState("");
  const [returnedText, setReturnedText] = useState("");
  const [remainingText, setRemainingText] = useState("");

  const menuItems = [
    {
      key: "danh-muc-khach",
      icon: <TeamOutlined />,
      label: "Danh mục khách",
    },
    {
      key: "ket-qua-xo-so",
      icon: <TrophyOutlined />,
      label: "Kết quả xổ số",
    },
    {
      key: "bao-cao-tong",
      icon: <BarChartOutlined />,
      label: "Báo cáo tổng",
    },
    {
      key: "tuy-chinh",
      icon: <SettingOutlined />,
      label: "Tùy chỉnh",
    },
  ];

  // Làm mới riêng ô Nhập vào
  const handleResetInput = () => {
    setInputText("");
    message.success("Đã làm mới nội dung nhập");
  };

  // Sao chép nội dung
  const handleCopy = async (text) => {
    if (!text) {
      message.warning("Không có nội dung để sao chép");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      message.success("Đã sao chép");
    } catch {
      message.error("Không thể sao chép nội dung");
    }
  };

  // Xử lý khi nhấn Duyệt tin
  const handleDuyetTin = () => {
    if (!inputText.trim()) {
      message.warning("Vui lòng nhập dữ liệu trước");
      return;
    }

    // TODO: Gọi hàm xử lý dữ liệu hiện có của bạn tại đây.
    message.success("Đã nhận dữ liệu để duyệt");
  };

  // Xử lý khi nhấn Tính toán
  const handleTinhToan = () => {
    if (!inputText.trim()) {
      message.warning("Vui lòng nhập dữ liệu trước");
      return;
    }

    // TODO: Gọi hàm tính toán hiện có của bạn tại đây.
    // Cập nhật returnedText và remainingText từ kết quả thật.
    message.success("Đã nhận yêu cầu tính toán");
  };

  // Tạo khung kết quả dùng chung
  const renderResultPanel = ({
    title,
    subtitle,
    value,
    onChange,
    icon,
    placeholder,
  }) => (
    <section className="data-panel">
      <div className="panel-header">
        <div className="panel-icon">{icon}</div>

        <div className="panel-title-group">
          <h3 className="panel-title">{title}</h3>
          <p className="panel-subtitle">{subtitle}</p>
        </div>

        <button
          type="button"
          className="copy-button"
          onClick={() => handleCopy(value)}
        >
          <CopyOutlined />
          <span>Sao chép</span>
        </button>
      </div>

      <textarea
        className="data-textarea"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={4}
      />
    </section>
  );

  return (
    <Layout className="app-layout">
      {/* HEADER */}
      <Header className="app-header">
        <Button
          className="menu-button"
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setOpen(true)}
        />

        <div className="app-brand">
          <div className="app-logo">pro399</div>
          <div className="brand-divider" />
          <div className="header-title">Nhanh - Gọn - Chính xác</div>
        </div>
      </Header>

      {/* MENU */}
      <Drawer
        title="Menu hệ thống"
        placement="left"
        open={open}
        onClose={() => setOpen(false)}
        size="default"
      >
        <Menu
          mode="inline"
          items={menuItems}
          // eslint-disable-next-line no-empty-pattern
          onClick={({}) => {
            setOpen(false);
            // Thêm xử lý điều hướng theo key nếu cần.
          }}
        />
      </Drawer>

      {/* NỘI DUNG */}
      <Content className="app-content">
        <main className="workspace">
          <section className="welcome-section">
            <div></div>
          </section>

          <div className="dashboard-grid">
            {/* KHUNG NHẬP VÀO */}
            <section className="data-panel input-panel">
              <div className="panel-header">
                <div className="panel-icon">
                  <FileTextOutlined />
                </div>

                <div className="panel-title-group">
                  <h3 className="panel-title">Nhập dữ liệu</h3>
                  <p className="panel-subtitle">Nhập dữ liệu cần xử lý</p>
                </div>

                {/* LÀM MỚI Ở BÊN TRÁI SAO CHÉP */}
                <div className="panel-header-actions">
                  <button
                    type="button"
                    className="copy-button"
                    onClick={handleResetInput}
                  >
                    <ReloadOutlined />
                    <span>Làm mới</span>
                  </button>

                  <button
                    type="button"
                    className="copy-button"
                    onClick={() => handleCopy(inputText)}
                  >
                    <CopyOutlined />
                    <span>Sao chép</span>
                  </button>
                </div>
              </div>

              <div className="action-row">
                <button
                  type="button"
                  className="action-button review-button"
                  onClick={handleDuyetTin}
                >
                  <CheckCircleOutlined />
                  <span>Duyệt tin</span>
                </button>

                <button
                  type="button"
                  className="action-button calculate-button"
                  onClick={handleTinhToan}
                >
                  <CalculatorOutlined />
                  <span>Tính toán</span>
                </button>
              </div>

              <textarea
                className="data-textarea input-textarea"
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
                placeholder="Nhập dữ liệu..."
                rows={10}
              />
            </section>

            {/* CỘT KẾT QUẢ */}
            <div className="result-column">
              {renderResultPanel({
                title: "Gửi đi",
                subtitle: "Kết quả đã được xử lý",
                value: returnedText,
                onChange: setReturnedText,
                icon: <CheckCircleOutlined />,
                placeholder: "Kết quả sẽ hiển thị ở đây...",
              })}

              {renderResultPanel({
                title: "Còn thừa",
                subtitle: "Dữ liệu còn lại sau xử lý",
                value: remainingText,
                onChange: setRemainingText,
                icon: <BarChartOutlined />,
                placeholder: "Dữ liệu còn thừa sẽ hiển thị ở đây...",
              })}
            </div>
          </div>

          <footer className="app-footer">© Pro399 - Hệ thống quản lý</footer>
        </main>
      </Content>
    </Layout>
  );
}

export default App;
