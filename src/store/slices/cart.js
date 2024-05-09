import { ErrorToast } from '@/services/toasterServices';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartData: {
    status: false,
    helperData: [],
    addLimit: 4,
    totalAmount: 0,
    itemTotalAmount: 0,
  },
};

const loadCartDataFromLocalStorage = () => {
  try {
    const cartData = localStorage.getItem('cartData');
    if (cartData) {
      return JSON.parse(cartData);
    }
  } catch (error) {
    ErrorToast({ text: 'Error loading cart data from localStorage' });
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return initialState.cartData.helperData;
};

const saveCartDataToLocalStorage = (cartData) => {
  try {
    localStorage.setItem('cartData', JSON.stringify(cartData));
  } catch (error) {
    ErrorToast({ text: 'Error saving cart data to localStorage' });
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

const calculateTotalAmount = (cartItems) => {
  let total = 0;
  let hasDeliveryFee = false;

  cartItems.forEach((item) => {
    total += item.price * item.quantity;
    if (item.price < 1000 && !hasDeliveryFee) {
      total += 149;
      hasDeliveryFee = true;
    }
  });

  return Number(total.toFixed(2));
};

const handleItemTotalAmount = (cartItems) => {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.price * item.quantity;
  });

  return Number(total.toFixed(2));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    ...initialState,
    cartData: {
      ...initialState.cartData,
      helperData: loadCartDataFromLocalStorage(),
      totalAmount: calculateTotalAmount(loadCartDataFromLocalStorage()),
      itemTotalAmount: handleItemTotalAmount(loadCartDataFromLocalStorage()),
    },
  },
  reducers: {
    setCartItem(state, action) {
      const existingProduct = state.cartData.helperData.find(
        (product) => product.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cartData.helperData.push({ ...action.payload, quantity: 1 });
      }

      state.cartData.status = true;
      state.cartData.totalAmount = calculateTotalAmount(
        state.cartData.helperData
      );
      state.cartData.itemTotalAmount = handleItemTotalAmount(
        state.cartData.helperData
      );
      saveCartDataToLocalStorage(state.cartData.helperData);
    },
    removeCartItem(state, action) {
      state.cartData.helperData = state.cartData.helperData.filter(
        (product) => product.id !== action.payload.id
      );
      state.cartData.status = state.cartData.helperData.length > 0;
      state.cartData.totalAmount = calculateTotalAmount(
        state.cartData.helperData
      );
      state.cartData.itemTotalAmount = handleItemTotalAmount(
        state.cartData.helperData
      );
      saveCartDataToLocalStorage(state.cartData.helperData);
    },
    decrementCartItem(state, action) {
      const existingProduct = state.cartData.helperData.find(
        (product) => product.id === action.payload.id
      );

      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      } else {
        state.cartData.helperData = state.cartData.helperData.filter(
          (product) => product.id !== action.payload.id
        );
      }

      state.cartData.status = state.cartData.helperData.length > 0;
      state.cartData.totalAmount = calculateTotalAmount(
        state.cartData.helperData
      );
      state.cartData.itemTotalAmount = handleItemTotalAmount(
        state.cartData.helperData
      );
      saveCartDataToLocalStorage(state.cartData.helperData);
    },
  },
});

export const { setCartItem, removeCartItem, decrementCartItem } =
  cartSlice.actions;
export default cartSlice.reducer;
