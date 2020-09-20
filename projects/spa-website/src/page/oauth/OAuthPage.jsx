import React, { useMemo } from "react";
import { parseQueryString } from "UTIL/query";
import { useTitleWCMS } from "HOOK";
import { useHistory } from "react-router-dom";
import { routePath } from "PAGE/routePath";
import { Alert, Card, Icon, Modal, Spin } from "antd";
import { useApiRequest } from "HOOK/useApiRequest";
import "./oauthPage.css";

/**
 * OAuth登录的页面.
 * (也包括绑定时的)
 * */
function OAuthPage() {
  useTitleWCMS("OAuth登录");
  const history = useHistory();

  const modal = useMemo(() => {
    return Modal.info({
      icon: <Icon type="loading" />,
      title: "登录中...",
      content: "请稍等",
      footer: null,
    });
  }, []);

  useApiRequest({
    path: "/oauth/link/qq",
    method: "POST",
    data: { token: parseQueryString() },
    onSuccess: ({ code, message }) => {
      switch (code) {
        case 16:
          //登录成功
          modal.update({
            type: "success",
            icon: <Icon type="check-circle" />,
            title: "登陆成功",
            content: "正在跳转中...",
          });
          setTimeout(() => {
            modal.destroy();
            history.push(routePath.wcms.DASHBOARD);
          }, 1000);
          break;
        case 17:
          //绑定成功
          modal.update({
            type: "success",
            icon: <Icon type="check-circle" />,
            title: "绑定成功",
            content: "你可通过QQ登录后台系统.",
            okText: "好的",
            onOk: () => {
              history.push(routePath.wcms.SELF_PROFILE);
            },
          });
          break;
        default:
          //登录失败
          modal.update({
            type: "error",
            icon: <Icon type="close-circle" />,
            title: "登陆失败",
            content: message,
            okText: "返回",
            onOk: () => {
              history.push(routePath.wcms.LOGIN);
            },
          });
      }
    },
    onError: (error) => {
      modal.update({
        type: "error",
        icon: <Icon type="close-circle" />,
        title: "登陆失败",
        content: error.toString(),
        okText: "返回",
        onOk: () => {
          history.push(routePath.wcms.LOGIN);
        },
      });
    },
  });

  return (
    <div className="oauth-page-container">
      <Card title="QQ OAuth登录" className="oauth-page-card">
        <Alert
          type="info"
          message={
            <span>
              <Spin />
              通过QQ登录中...
            </span>
          }
        />
      </Card>
    </div>
  );
}
export { OAuthPage };
