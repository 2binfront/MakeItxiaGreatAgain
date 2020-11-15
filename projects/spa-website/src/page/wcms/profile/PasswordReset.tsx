import React from "react";
import { LockOutlined } from "@ant-design/icons";
import { Alert, Button, Checkbox, Col, Form, Input, Row } from "antd";
import { useApiRequest } from "@/hook/useApiRequest";

export const PasswordReset: React.FC = () => {
  const [form] = Form.useForm();
  const { loading, sendRequest } = useApiRequest({
    path: "/member/me/password",
    method: "PUT",
    manual: true,
    onSuccess: () => {
      form.resetFields();
    },
    popModal: {
      onSuccess: {
        content: "密码修改成功",
      },
      onFail: {
        content: "密码修改失败",
      },
      onError: true,
    },
  });

  function handleSubmit(values: any) {
    sendRequest({
      requestBody: values,
    });
  }

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="password"
        label="新密码"
        rules={[
          { required: true, message: "请填写密码" },
          {
            pattern: /^\S{8,}$/,
            message: " ",
          },
        ]}
        hasFeedback
        extra={<Alert message="密码要求：至少8个字符" type="info" />}
      >
        <Input.Password
          prefix={<LockOutlined className="form-field-icon" />}
          placeholder="新密码"
          autoComplete="new-password"
        />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="确认密码"
        required
        rules={[
          {
            validator: async (rule, value) => {
              if (form.getFieldValue("password") !== value) {
                return Promise.reject("两次密码不一致");
              }
            },
          },
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="form-field-icon" />}
          placeholder="确认密码"
          autoComplete="new-password"
        />
      </Form.Item>

      <Form.Item
        name="logoutOnOtherDevices"
        label="登录状态"
        initialValue={true}
        valuePropName="checked"
        extra={
          <Alert
            message="如果你曾在公共电脑上登录，或担心账号泄露，最好勾选这个。"
            type="warning"
          />
        }
      >
        <Checkbox>注销其他设备上的登录状态</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ span: 24 }}>
        <Row justify="center" align="middle">
          <Col>
            <Button type="primary" loading={loading} htmlType="submit">
              重置密码
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};
