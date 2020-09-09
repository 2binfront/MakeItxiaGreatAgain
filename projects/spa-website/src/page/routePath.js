/**
 * 定义路由地址.
 * */
const routePath = {
  CUSTOM: "/custom",
  custom: {
    HOME: "/custom/home",
    ORDER: "/custom/order",
    RETRIEVE: "/custom/retrieve",
  },
  WCMS: "/wcms",
  wcms: {
    LOGIN: "/wcms/login",
    DASHBOARD: "/wcms/dashboard",
    HANDLE_ORDER: "/wcms/handle-order",
    ANNOUNCE_MANAGE: "/wcms/announce-manage",
    SELF_PROFILE: "/wcms/profile",
    MEMBER_MANAGE: "/wcms/member-manage",
  },
  OAUTH: "/oauth",
};

export { routePath };
