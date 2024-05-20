export const getShippingFee = (totalAmount) => {
  if (totalAmount < 1000) {
    return 149;
  }
  return 0;
};
