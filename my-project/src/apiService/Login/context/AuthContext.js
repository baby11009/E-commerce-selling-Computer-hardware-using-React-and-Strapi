import { createContext, useContext } from "react";

export const AuthContext = createContext({
  windowSize : Number,
  zIndex : Number,
  setZIndex : () => {},
  toast : () => {},
  user: undefined,
  isLoading: false,
  setUser: () => {},
  fetchLoggedInUser : () => {},
  handleSignout : () => {},
  cart : undefined,
  cartProducts : undefined,
  fetchUserCart : () => {},
  coupon : Number,
  setCoupon : () => {},
  priceWTax : Number,
  subTotal : Number,
  totalPrice : Number,
  setTotalPrice : () => {},
  shipFee : Number,
  setShipFee : () => {},
  userNotifications : undefined,
  fetchUserNotis : () => {},
 });

export const useAuthContext = () => useContext(AuthContext);
