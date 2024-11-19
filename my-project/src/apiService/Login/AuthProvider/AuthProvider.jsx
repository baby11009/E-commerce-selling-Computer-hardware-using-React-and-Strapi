import { useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { getToken, removeToken } from "../tokenHelper";
import request from "../../../utils/request";
import {
  createLcItem,
  getLcItem,
  updateLcItem,
  deleteLcItem,
} from "../../../LocalStorage/LocalStorageFunc";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AuthProvider = ({ children }) => {
  const [zIndex, setZIndex] = useState(2);

  const [userData, setUserData] = useState();

  const [cart, setCart] = useState();

  const [cartProducts, setCartProducts] = useState();

  const [userNotifications, setUserNotifications] = useState(undefined);

  const [coupon, setCoupon] = useState(getLcItem("Coupon") || 0);

  const [subTotal, setSubtotal] = useState(0);

  const [pWT, setPWT] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  const [shipFee, setShipFee] = useState(
    getLcItem("shipFee") ? getLcItem("shipFee") : 0
  );

  const [isLoading, setIsLoading] = useState(false);

  const authToken = getToken(import.meta.env.VITE_AUTH_TOKEN);

  // console.log("🚀 ~ authToken:", authToken)

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };
  useEffect(() => {
    // Thêm sự kiện lắng nghe khi mount component
    window.addEventListener("resize", handleResize);
    // Xóa sự kiện lắng nghe khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchLoggedInUser = async () => {
    setIsLoading(true);
    try {
      request
        .get(`users/me?populate=cart&populate=avatar_url`, {
          headers: {
            Authorization: `${import.meta.env.VITE_BEARER} ${authToken}`,
          },
        })
        .then((rsp) => {
          setUserData(rsp.data);
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      alert("Error While Getting Logged In User Details");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserCart = async () => {
    setIsLoading(true);
    try {
      await request
        .get(
          `carts/${userData?.cart?.id}?populate[product_carts][populate][product][populate][0]=MainImage&populate[product_carts][populate][product][populate][1]=sale`,
          {
            headers: {
              Authorization: `${import.meta.env.VITE_BEARER} ${authToken}`,
            },
          }
        )
        .then((rsp) => {
          setCart(rsp.data?.data);
          setCartProducts(rsp?.data?.data?.attributes?.product_carts?.data);
        });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserNotis = () => {
    try {
      request
        .get(
          `notificantions?filters[user]=${userData?.id}&populate[0]=notification_type&populate[1]=notification_state&sort=createdAt:desc&pagination[page]=1&pagination[pageSize]=10`,
          {
            headers: {
              Authorization: `${import.meta.env.VITE_BEARER} ${authToken}`,
            },
          }
        )
        .then((rsp) => {
          setUserNotifications(rsp.data);
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      toast.error(() => <div>Unable to get your notifications data</div>);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUser = (user) => {
    setUserData(user);
  };

  useEffect(() => {
    if (authToken) {
      fetchLoggedInUser(authToken);
    }
  }, [authToken]);

  const handleSignout = (navigate) => {
    if (navigate) {
      navigate("/", { replace: true });
    }
    removeToken(import.meta.env.VITE_AUTH_TOKEN);
    handleUser();
    setCart();
    setCartProducts();
  };

  useEffect(() => {
    if (userData) {
      fetchUserCart(userData?.cart?.id);
      fetchUserNotis(userData?.id);
    }
  }, [userData]);

  useEffect(() => {
    setSubtotal(cart?.attributes?.TotalPrice);
    let pwt = Math.ceil(
      cart?.attributes?.TotalPrice +
        Math.ceil((cart?.attributes?.TotalPrice * 5) / 100)
    );
    setPWT(pwt);
    let total = Math.ceil(
      cart?.attributes?.TotalPrice +
        Math.ceil((cart?.attributes?.TotalPrice * 5) / 100) -
        Math.ceil((cart?.attributes?.TotalPrice * coupon) / 100)
    );
    setTotalPrice(total);
  }, [cart]);

  useEffect(() => {
    if (getLcItem("Coupon")) {
      updateLcItem("Coupon", coupon);
    } else {
      createLcItem("Coupon", coupon);
    }
    let total =
      pWT -
      Math.ceil((cart?.attributes?.TotalPrice * getLcItem("Coupon")) / 100);
    setTotalPrice(total);
  }, [coupon]);

  return (
    <AuthContext.Provider
      value={{
        windowSize,
        zIndex: zIndex,
        setZIndex: setZIndex,
        toast: toast,
        user: userData,
        isLoading,
        setUser: handleUser,
        fetchLoggedInUser: fetchLoggedInUser,
        handleSignout: handleSignout,
        cart: cart,
        cartProducts: cartProducts,
        fetchUserCart: fetchUserCart,
        coupon: coupon,
        setCoupon: setCoupon,
        subTotal,
        priceWTax: pWT,
        totalPrice: totalPrice,
        setTotalPrice: setTotalPrice,
        shipFee: shipFee,
        setShipFee: setShipFee,
        userNotifications: userNotifications,
        fetchUserNotis: fetchUserNotis,
      }}
    >
      <Toaster
        toastOptions={{
          duration: 1000,
        }}
      />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
