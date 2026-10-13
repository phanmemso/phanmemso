import "../src/Root.css";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    if (values.user !== "1") {
      message.error("Tài khoản không chính xác!");

      // Xóa value user
      form.setFieldValue("user", "");

      // Focus lại input user
      form.getFieldInstance("user")?.focus();

      return;
    }

    if (values.password !== "123") {
      message.error("Mật khẩu không chính xác!");

      form.setFieldValue("password", "");

      form.getFieldInstance("password")?.focus();

      return;
    }
    navigate("/app");
    message.success("Đăng nhập thành công!");
  };

  return (
    <div className="page-login">
      <Form
        form={form}
        className="form-login"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <div className="login-title">ssv123</div>
        <Form.Item
          label="Tài khoản"
          name="user"
          rules={[
            {
              required: false,
              message: "Vui lòng nhập tài khoản",
            },
          ]}
        >
          <Input
            autoComplete="username"
            placeholder="Nhập tài khoản"
            autoFocus
          />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: false,
              message: "Vui lòng nhập mật khẩu",
            },
            {
              min: 3,
              message: "Mật khẩu tối thiểu 3 ký tự",
            },
          ]}
        >
          <Input.Password
            autoComplete="current-password"
            placeholder="Nhập mật khẩu"
          />
        </Form.Item>
        <div className="register-guide">
          <span onClick={() => navigate("/huong-dan-dang-ky")}>
            Hướng dẫn đăng ký
          </span>
        </div>
        <Button color="red" variant="solid" htmlType="submit" block>
          Đăng nhập
        </Button>
      </Form>
    </div>
  );
}

export default Login;
