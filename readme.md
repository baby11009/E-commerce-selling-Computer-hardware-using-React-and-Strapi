<div align="center" style="font-size:40px, line-height:48px;font-weight:bold">
  <h1>
  <b>Project information</b></h1>
</div>

<h2><b>Front-end</b></h2>
React, Tailwindcss, axios, framer-motion, react query,...

<h2><b>Back-end</b></h2>
Strapi, sqlite, nodemailer, email-designer,...


<div align="center" style="font-size:40px, line-height:48px;font-weight:bold">
  <h1>
  <b>Project preview</b></h1>
</div>

<h2><b>Landing Page</b></h2>

![Landing Page 1](./preview%20img/HomePage_1.png)
![Landing Page 2](./preview%20img/HomePage_2.png)
![Landing Page 3](./preview%20img/HomePage_3.png)

<h2><b>Shopping Page</b></h2>

![Shopping Page 1](./preview%20img/ShoppingPage.png)

<h2><b>Shopping Cart</b></h2>

![Shopping Cart 1](./preview%20img/ShoppingCart_1.png)
![Shopping Cart 2](./preview%20img/ShoppingCart_2.png)

<h2><b>Checkout Process</b></h2>

![Checkout 1](./preview%20img/CheckoutBilling.png)
![Checkout 2](./preview%20img/CheckoutPayment.png)
![Payment 1](./preview%20img/PaypalPayment.png)
![Payment 2](./preview%20img/VNPayPayment.png)

<h2><b>Login & Register & Account setting & Tracking Order</b></h2>

![Login](./preview%20img/SignIn.png)
![Register](./preview%20img/Register.png)
![Settings](./preview%20img/AccountSetting.png)
![Tracking Order](./preview%20img/TrackingOrder.png)

<h2><b>Admin Manage Page</b></h2>

![Admin manage data](./preview%20img/AdminManagePage.png)
![Admin manage media file](./preview%20img/AdminManagePage.png)
![Email template 1](./preview%20img/ConfirmAccountTemplate.png)
![Email template 2](./preview%20img/ResetPasswordTemplate.png)
![Email template 3](./preview%20img/ConfirmOrderTemplate.png)

<div align="center" style="font-size:40px, line-height:48px;font-weight:bold">
  <h1>
  <b>How to use</b></h1>
</div>

<h2><b>Front-end</b></h2>

Create a .env file with the following configuration

```
VITE_TITLE=How To React (Your application title)
VITE_BE_API=http://localhost:1337/api (Default API url)
VITE_BE_IMG=http://localhost:1337 (Default API url for media file)
VITE_AUTH_TOKEN=authToken (key for saving token by using cookie)
VITE_BEARER=Bearer (for authorization in headers)
VITE_SHIP_DATA=shippingData (key for saving shipping data in localStorage)

#https://api.ghn.vn/home/docs/detail?id=83 (GHN API documentation)

VITE_GHN_TOKEN=  (Your own GHN - Giao Hang Nhanh token - use your own token)
VITE_GHN_SHOP_ID= (Your own GHN - Giao Hang Nhanh shop id)
VITE_PROVINCE_API=https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province (GHN Api to get province)
VITE_DISTRICT_API=https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district (GHN Api to get district)
VITE_WARD_API=https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward (GHN Api to get ward)
VITE_CAL_SHIP_FEE_API=https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee (GHN Api to caculating shipping fee)
VITE_FROM_DISTRICT= (Your GHN shop address - district)
VITE_FROM_WARD= (Your GHN shop address - district)
VITE_SERVICE_ID= (GHN service id )
VITE_SERVICE_TYPE= (GHN service type )
VITE_GHN_CREATE_API=https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create (GHN Api to create order)
VITE_GHN_GET_ORDER_API=https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail-by-client-code (GHN Api to get order information)
VITE_GHN_CANCEL_ORDER_API=https://dev-online-gateway.ghn.vn/shiip/public-api/v2/switch-status/cancel (GHN Api to cancel order)

#https://developer.paypal.com/docs/online/ (Paypal document)

VITE_PAYPAL_CLIENT_ID= (Your paypal dev account client id)
VITE_PAYPAL_SECRET_KEY= (Your paypal dev account secret key)
VITE_PAYPAL_GERNER_TOKEN_API=https://api-m.sandbox.paypal.com/v1/oauth2/token (Paypal api to get ouath2 token)
VITE_PAYPAL_REFUND_API=https://api-m.sandbox.paypal.com/v2/payments/captures (Paypal api to refund payment)
```

Install package first then run with the following command

```bash
npm install
npm run dev
```

<h2><b>Back-end</b></h2>

Create a .env file with the following configuration

```
HOST=0.0.0.0
PORT=1337
APP_KEYS=FP8rCp3DpYPzlpwW8+LrBA==,27+PAQZPoxXLDtDgVACeXg==,Y/Bykj1aWESrcWkP9FvvOg==,Ln5zCeZnNZ1CN23axfU2lQ==
API_TOKEN_SALT=ji8qcEObh1k65nXXqmdksQ==
ADMIN_JWT_SECRET=vtqWnUO8bqPzS54wSEvzYg==
TRANSFER_TOKEN_SALT=klACPBwyhH1bSNjFfw39Nw==
RESEND_API_KEY=re_D9rc2gXr_JorXYB1UQ7CBkLSiZ8T7ehpF
# Database
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
JWT_SECRET=XjpI/PBWNR4pAO8c0WlOIw==

#Sending email using gmail SMTP server
SMTP_HOST=smtp.gmail.com (gmail SMTP host)
SMTP_PORT=465 (gmail SMTP port)
SMTP_USERNAME= (your SMTP account username)
SMTP_PASSWORD= (your SMTP account password)

```

Install package first then run with the following command

```bash
npm install
npm run start
```
