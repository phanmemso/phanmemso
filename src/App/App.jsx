import { useState } from "react";
import { Drawer, Button, Menu, Layout, DatePicker } from "antd";
import dayjs from "dayjs";
import ResultTable from "../ResultTable";

import {
  MenuOutlined,
  TeamOutlined,
  TrophyOutlined,
  BarChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import InputComponent from "./InputComponent";
import "./App.css";

const { Header, Content } = Layout;

function App() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // Ẩn bảng kết quả ban đầu
  const [showResult, setShowResult] = useState(false);

  const showDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

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

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <Button
          className="mobile-menu-button"
          type="text"
          icon={<MenuOutlined />}
          onClick={showDrawer}
          aria-label="Mở menu"
        />

        <div className="app-logo">pro399</div>

        <Menu className="desktop-menu" mode="horizontal" items={menuItems} />

        <DatePicker
          className="app-date"
          value={selectedDate}
          onChange={setSelectedDate}
          format="DD/MM/YYYY"
          placeholder="Chọn ngày"
          allowClear={false}
        />
      </Header>

      <Content className="app-content">
        <InputComponent
          onTinhToan={() => setShowResult(true)}
          offShowKetQua={() => setShowResult(false)}
        />
        <InputComponent
          onTinhToan={() => setShowResult(true)}
          offShowKetQua={() => setShowResult(false)}
        />
        <InputComponent
          onTinhToan={() => setShowResult(true)}
          offShowKetQua={() => setShowResult(false)}
        />

        {showResult && (
          <div style={{ marginTop: 20 }}>
            <ResultTable />
          </div>
        )}
      </Content>

      <Drawer
        title="Menu"
        placement="left"
        onClose={closeDrawer}
        open={open}
        size={300}
        styles={{
          wrapper: {
            maxWidth: "85vw",
          },
        }}
      >
        <Menu mode="vertical" items={menuItems} onClick={closeDrawer} />
      </Drawer>
    </Layout>
  );
}

export default App;
