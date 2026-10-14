import { Table } from "antd";
import key_kieuDanh from "./key_kieuDanh";

function ThongKeTable({ data = [] }) {
  const dataSource = key_kieuDanh.map((kieudanh) => {
    // Lọc các phần tử thuộc kiểu đánh hiện tại
    const danhSach = data.filter(
      (item) =>
        String(item.kieudanh ?? item.Kieudanh ?? "").toLowerCase() ===
        String(kieudanh).toLowerCase(),
    );

    let soCon = 0;
    let soTien = 0;

    danhSach.forEach((item) => {
      const sodanh = item.sodanh ?? item.Sodanh ?? [];

      const danhSachSo = Array.isArray(sodanh)
        ? sodanh
        : String(sodanh).trim().split(/\s+/).filter(Boolean);

      const tienMoiCon = Number(item.sotien ?? item.Sotien ?? 0) || 0;

      soCon += danhSachSo.length;
      soTien += danhSachSo.length * tienMoiCon;
    });

    return {
      key: kieudanh,
      lo: kieudanh,
      soCon,
      soTien,
    };
  });

  const columns = [
    {
      title: "Loại đánh",
      dataIndex: "lo",
      key: "lo",
      align: "center",
    },
    {
      title: "Số con",
      dataIndex: "soCon",
      key: "soCon",
      align: "right",
    },
    {
      title: "Số tiền",
      dataIndex: "soTien",
      key: "soTien",
      align: "right",
      render: (value) => value.toLocaleString("vi-VN"),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      bordered
      size="small"
      summary={() => {
        const tongSoCon = dataSource.reduce(
          (tong, item) => tong + item.soCon,
          0,
        );

        const tongSoTien = dataSource.reduce(
          (tong, item) => tong + item.soTien,
          0,
        );

        return (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0}>
              <strong>Tổng cộng</strong>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={1} align="right">
              <strong>{tongSoCon}</strong>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={2} align="right">
              <strong>{tongSoTien.toLocaleString("vi-VN")}</strong>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        );
      }}
    />
  );
}

export default ThongKeTable;
