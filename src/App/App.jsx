import { useState } from "react";
import { Layout, Drawer, Button, Menu, message, Modal } from "antd";
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
import TinhToan from "../Module/md_TinhToan";
import dinhMuc from "../Module/md_dinhMuc";
import truDinhMuc from "../Module/md_truDinhMuc";
import ThongKeTable from "../components/ThongKeTable";
import chuanHoaChuoi from "../Module/md_KiemLoi";
import "../components/InputFlash.css";
import arr_TuBiLoi from "../Module/md_baoLoi";
import arr_KiemTraThieuSoTien from "../Module/md_baoLoi";
const { Header, Content } = Layout;

function App() {
  const [open, setOpen] = useState(false);

  const [inputText, setInputText] = useState("");
  const [returnedText, setReturnedText] = useState("");
  const [remainingText, setRemainingText] = useState("");

  const [thongKeData, setThongKeData] = useState([]);
  const [thongKeTitle, setThongKeTitle] = useState("");
  const [openThongKe, setOpenThongKe] = useState(false);
  const [showError, setShowError] = useState(false);
  const [dsTuBiLoi, setdsTuBiLoi] = useState([]);
  const [btnTinhToan, setbtnTinhToan] = useState(true);

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
  // danh sach tu bi loi

  // Tự tạo regex từ danh sách từ cần tìm
  const regex = new RegExp(
    `(${dsTuBiLoi
      .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|")})`,
    "gi",
  );

  // Tô đỏ các từ tìm thấy
  const renderText = () => {
    if (!showError) {
      return inputText;
    }

    return inputText.split(regex).map((part, index) => {
      const isError = dsTuBiLoi.some(
        (word) => word.toLowerCase() === part.toLowerCase(),
      );

      return isError ? (
        <span className="error-text" key={index}>
          {part}
        </span>
      ) : (
        part
      );
    });
  };

  const handleResetInput = () => {
    setInputText("");
    setReturnedText("");
    setRemainingText("");
    setShowError(false);
    message.success("Đã làm mới nội dung nhập");
  };

  const handleCopy = async (text) => {
    if (!text?.trim()) {
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

  const handleDuyetTin = () => {
    if (!inputText.trim()) {
      message.warning("Vui lòng nhập dữ liệu trước");
      return;
    }
    //Bước 1: chuẩn hóa chuỗi, đưa chữ hoa thành chữ thường
    const text = chuanHoaChuoi(inputText);
    //Bước 2: kiểm tra xem có bị thiếu kiểu đánh không
    arr_KiemTraThieuSoTien(text);
    console.log(arr_KiemTraThieuSoTien(text));
    setInputText(text); // cập nhật lại value cho ô nhập tin
    setdsTuBiLoi(arr_TuBiLoi(text).arr_TuKhongHopLe);

    setShowError(true); // thông báo lỗi đỏ cho người dùng sửa lỗi
    if (arr_TuBiLoi(text).arr_TuKhongHopLe.length > 0) {
      message.error(`${arr_TuBiLoi(text).arr_TuKhongHopLe[0]} không hợp lệ`);
    } else if (arr_TuBiLoi(text).arr_ThieuKDThieuST.length > 0) {
      message.error(
        `Thiếu kiểu đánh trước hoặc sau số ${arr_TuBiLoi(text).arr_ThieuKDThieuST[0]}`,
      );
    } else {
      message.success("Kiểm lỗi thành công");
      setbtnTinhToan(!btnTinhToan);
    }
  };

  // Dùng chung cho cả 3 nút Thống kê
  const handleThongKe = (text, title) => {
    if (!text?.trim()) {
      message.warning("Không có dữ liệu để thống kê");
      return;
    }

    try {
      const kq = TinhToan(text);

      setThongKeData(kq);
      setThongKeTitle(title);
      setOpenThongKe(true);
    } catch (error) {
      console.error("Lỗi thống kê:", error);
      message.error("Thống kê thất bại. Vui lòng kiểm tra dữ liệu.");
    }
  };

  const handleTinhToan = () => {
    if (!inputText.trim()) {
      message.warning("Vui lòng nhập dữ liệu trước");
      return;
    }

    try {
      const kq = TinhToan(inputText);
      const kqtv = truDinhMuc(kq, dinhMuc);

      setReturnedText(ketQuaSauKhiTruDinhMuc(kqtv.guiDi));
      setRemainingText(ketQuaSauKhiTruDinhMuc(kqtv.conLai));
      console.log(kq);
      message.success("Tính toán thành công");
      setbtnTinhToan(!btnTinhToan);
    } catch (error) {
      console.error("Lỗi tính toán:", error);
      message.error("Tính toán thất bại. Vui lòng kiểm tra dữ liệu.");
    }
  };

  function ketQuaSauKhiTruDinhMuc(data = []) {
    return data
      .map((item) => {
        const sodanh = Array.isArray(item.sodanh)
          ? item.sodanh.join(" ")
          : String(item.sodanh ?? "");

        return `${item.kieudanh} ${sodanh} x${item.sotien}`;
      })
      .join(" ");
  }

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

        <div className="panel-header-actions">
          <button
            type="button"
            className="copy-button"
            onClick={() => handleThongKe(value, title)}
          >
            <BarChartOutlined />
            <span>Thống kê</span>
          </button>

          <button
            type="button"
            className="copy-button"
            onClick={() => handleCopy(value)}
          >
            <CopyOutlined />
            <span>Sao chép</span>
          </button>
        </div>
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

      <Drawer
        title="Menu hệ thống"
        placement="left"
        open={open}
        onClose={() => setOpen(false)}
        size="default"
      >
        <Menu mode="inline" items={menuItems} onClick={() => setOpen(false)} />
      </Drawer>

      <Content className="app-content">
        <main className="workspace">
          <section className="welcome-section">
            <div />
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
                  <p className="panel-subtitle">
                    *Làm mới sẽ xóa dữ liệu hiện tại
                  </p>
                </div>

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
                    onClick={() => handleThongKe(inputText, "Nhập dữ liệu")}
                  >
                    <BarChartOutlined />
                    <span>Thống kê</span>
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
                  className="action-button review-button "
                  onClick={handleDuyetTin}
                >
                  <CheckCircleOutlined />
                  <span>Duyệt tin</span>
                </button>

                <button
                  type="button"
                  className="action-button calculate-button"
                  onClick={handleTinhToan}
                  disabled={btnTinhToan}
                >
                  <CalculatorOutlined />
                  <span>Tính toán</span>
                </button>
              </div>
              {/* <textarea
                className="data-textarea input-textarea "
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
                placeholder="Nhập dữ liệu..."
                rows={10}
              />
              <InputFlash /> */}
              <div className="input-flash">
                <div className="input-wrapper">
                  <textarea
                    className="data-textarea input-textarea"
                    rows={10}
                    value={inputText}
                    onChange={(event) => {
                      setInputText(event.target.value);
                      setShowError(false);
                    }}
                    onScroll={(event) => {
                      const overlay = event.target.nextElementSibling;

                      if (overlay) {
                        overlay.scrollTop = event.target.scrollTop;
                        overlay.scrollLeft = event.target.scrollLeft;
                      }
                    }}
                    placeholder="Nhập dữ liệu..."
                    spellCheck={false}
                  />

                  <div className="input-overlay">{renderText()}</div>
                </div>
              </div>
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

          {/* Bảng chỉ xuất hiện khi nhấn một trong 3 nút Thống kê */}
          <Modal
            title={`Thống kê - ${thongKeTitle}`}
            open={openThongKe}
            onCancel={() => setOpenThongKe(false)}
            footer={[
              <Button key="close" onClick={() => setOpenThongKe(false)}>
                Đóng
              </Button>,
            ]}
            width={650}
            centered
          >
            <ThongKeTable data={thongKeData} />
          </Modal>

          <footer className="app-footer">
            © Pro399 - Nhanh - Gọn -Chính xác
          </footer>
        </main>
      </Content>
    </Layout>
  );
}

export default App;
