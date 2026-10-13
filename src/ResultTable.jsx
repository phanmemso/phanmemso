import { Table } from "antd";

function ResultTable() {
  const columns = [
    {
      title: "Loại",
      dataIndex: "loai",
      key: "loai",
    },
    {
      title: "Điểm",
      dataIndex: "diem",
      key: "diem",
      align: "right",
    },
    {
      title: "Tiền",
      dataIndex: "tien",
      key: "tien",
      align: "right",
    },
  ];

  const dataSource = [
    { key: "1", loai: "AB", diem: "", tien: "" },
    { key: "2", loai: "XC", diem: 120, tien: 90 },
    { key: "3", loai: "DT", diem: "", tien: "" },
    { key: "4", loai: "DX", diem: 24, tien: 1296 },
    { key: "5", loai: "LÔ 2", diem: 190, tien: 2565 },
    { key: "6", loai: "LÔ 3", diem: "", tien: "" },
    { key: "7", loai: "LÔ 4", diem: "", tien: "" },
  ];

  return (
    <>
      <div className="result-table">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          bordered
          size="small"
          tableLayout="fixed"
        />
      </div>
      <div style={{ color: "red", fontSize: "20px", fontWeight: "bold" }}>
        Liệt kê số trúng: 85.66(dx 3n)
      </div>
    </>
  );
}

export default ResultTable;
