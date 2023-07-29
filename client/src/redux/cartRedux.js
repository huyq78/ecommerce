import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find((item) => item._id === action.payload);
      item.quantity++;
      state.total += item.price;
    },
    decreaseQuantity: (state, action) => {
      const item = state.products.find((item) => item._id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1
      } else {
        item.quantity--;
        state.total -= item.price;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.products.find((item) => item._id === action.payload);
      const products = state.products.filter((item) => item._id !== action.payload);
      state.products = products;
      state.total -= removeItem.price * removeItem.quantity;
      state.quantity-=1;
    },
  },
});

export const { addProduct, increaseQuantity, decreaseQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
