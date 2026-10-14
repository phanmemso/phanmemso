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
  const [showResult, setShowResult] = useState(false);

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
          onClick={() => setOpen(true)}
          aria-label="Mở menu"
        />

        <div className="app-logo">pro399</div>

        <Menu className="desktop-menu" mode="horizontal" items={menuItems} />

        <DatePicker
          className="app-date"
          value={selectedDate}
          onChange={(date) => {
            if (date) setSelectedDate(date);
          }}
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

        {showResult && (
          <div className="result-container">
            <ResultTable />
          </div>
        )}
      </Content>

      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setOpen(false)}
        open={open}
        size={300}
        styles={{
          wrapper: {
            maxWidth: "85vw",
          },
        }}
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
