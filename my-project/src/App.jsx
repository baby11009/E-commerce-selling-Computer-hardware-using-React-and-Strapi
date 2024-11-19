import { Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "./components";
import {
  Home,
  Shop,
  ProductDetail,
  ErrorPage,
  SignIn,
  SignUp,
  ResendEmailConfirm,
  ForgotPassword,
  ResetPassword,
  UserSettings,
  Cart,
  Checkout,
} from "./pages";

import ConfirmEmail from "./pages/Auth/SignIn/ConfirmEmail";

function App() {
  return (
    <div className="w-full flex flex-col gradient">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/shop/page/:pageNum"
          element={
            <>
              <Navbar />
              <Shop />
              <Footer />
            </>
          }
        />
        <Route
          path="/shop/category/:categorySlug/page/:pageNum"
          element={
            <>
              <Navbar />
              <Shop />
              <Footer />
            </>
          }
        />
        <Route
          path="/shop/search/:searchText/page/:pageNum"
          element={
            <>
              <Navbar key="Navbar" />
              <Shop key="Shop" />
              <Footer key="Footer" />
            </>
          }
        />
        <Route
          path="/shop/product/:productSlug"
          element={
            <>
              <Navbar key="Navbar" />
              <ProductDetail key="PD" />
              <Footer key="Footer" />
            </>
          }
        />
        <Route path="/error/:errorMessage" element={<ErrorPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/email-confirmation/:confirmToken"
          element={<ConfirmEmail />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/resend-email-confirmation"
          element={<ResendEmailConfirm />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/reset-password/:privateCode"
          element={<ResetPassword />}
        />
        <Route path="/account/:type" element={<UserSettings />} />
        <Route path="/account/:type/page/:num" element={<UserSettings />} />
        <Route
          path="/account/:type/details/:orderId/page/:num"
          element={<UserSettings />}
        />
        <Route
          path="/cart"
          element={
            <>
              <Navbar />
              <Cart />
            </>
          }
        />
        <Route
          path="/check-out/:checkoutStep"
          element={
            <>
              <Navbar />
              <Checkout />
            </>
          }
        />
        <Route
          path="/check-out/:checkoutStep/paymentMethod/:method"
          element={
            <>
              <Navbar />
              <Checkout />
            </>
          }
        />

        <Route
          path="/check-out/:checkoutStep/paymentMethod/:method/paymentType/:type"
          element={
            <>
              <Navbar key="navbar" />
              <Checkout key="checkout" />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
