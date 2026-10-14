import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);

    try {
      // Demo: kiểm tra thông tin đã nhập.
      // Thay bằng API xác thực tài khoản thật khi triển khai.
      if (values.username == "1" && values.password == "1") {
        console.log(values.username);
        console.log(values.password);
        message.success("Đăng nhập thành công!");
        navigate("/app");
      } else {
        message.error("Đăng nhập thất bại!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .login-page {
          min-height: 100vh;
          min-height: 100dvh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding:
            max(20px, env(safe-area-inset-top))
            max(16px, env(safe-area-inset-right))
            max(20px, env(safe-area-inset-bottom))
            max(16px, env(safe-area-inset-left));
          background: #f3f5f9;
          font-family: -apple-system, BlinkMacSystemFont,
            "Segoe UI", Roboto, sans-serif;
        }

        .login-card {
          width: 100%;
          max-width: 400px;
          min-width: 0;
          padding: 32px 24px;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.07);
        }

        .login-logo {
          margin-bottom: 8px;
          color: #e02020;
          font-size: 30px;
          font-weight: 800;
          text-align: center;
          letter-spacing: 1px;
        }

        .login-heading {
          margin: 0 0 8px;
          color: #202124;
          font-size: 25px;
          font-weight: 700;
          text-align: center;
        }

        .login-description {
          margin: 0 0 28px;
          color: #777;
          font-size: 14px;
          line-height: 1.5;
          text-align: center;
        }

        .login-form .ant-input,
        .login-form .ant-input-affix-wrapper {
          font-size: 16px;
        }

        .login-form .ant-input-affix-wrapper {
          min-height: 48px;
          border-radius: 9px;
        }

        .login-form .ant-input {
          min-height: 24px;
        }

        .login-form .ant-form-item {
          margin-bottom: 20px;
        }

        .login-submit {
          width: 100%;
          height: 48px;
          border-radius: 9px;
          font-size: 16px;
          font-weight: 600;
        }

        .login-footer {
          margin-top: 24px;
          color: #888;
          font-size: 12px;
          line-height: 1.5;
          text-align: center;
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 28px 20px;
            border-radius: 14px;
          }

          .login-logo {
            font-size: 28px;
          }

          .login-heading {
            font-size: 23px;
          }
        }

        @media (max-height: 500px) and (orientation: landscape) {
          .login-page {
            align-items: flex-start;
          }

          .login-card {
            margin-block: 8px;
            padding-block: 20px;
          }
        }
      `}</style>

      <div className="login-card">
        <div className="login-logo">pro399</div>

        <h1 className="login-heading">Đăng nhập</h1>

        <p className="login-description">
          Vui lòng nhập thông tin tài khoản của bạn
        </p>

        <Form
          className="login-form"
          layout="vertical"
          requiredMark={false}
          onFinish={handleLogin}
          autoComplete="on"
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên đăng nhập!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Nhập tên đăng nhập"
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu"
              autoComplete="current-password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              size="large"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              className="login-submit"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <div className="login-footer">
          © {new Date().getFullYear()} pro399 v1.1
        </div>
      </div>
    </div>
  );
}

export default Login;
