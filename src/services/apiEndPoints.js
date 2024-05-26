const apiEndPoints = {
  // USER_LOGIN: 'collaborate/api/client/v1/user-login-api/',
  USER_LOGIN: 'api/v1/auth/login',
  USER_LOGOUT: 'api/v1/auth/logout',
  USER_REGISTER: 'api/v1/auth/register',
  USER_VERIFY_EMAIL: 'api/v1/auth/verify-email/',
  GET_ALL_PRODUCTS: 'api/v1/products/',
  POST_STRIPE_PAYMENT: 'api/v1/payment/stripe/',
  POST_USER_ORDER: 'api/v1/orders/',
  GET_USER_ORDER_LIST: 'api/v1/orders/showAllMyOrders',
  USER_DETAILS: 'api/v1/users/profile',
};

export default apiEndPoints;
