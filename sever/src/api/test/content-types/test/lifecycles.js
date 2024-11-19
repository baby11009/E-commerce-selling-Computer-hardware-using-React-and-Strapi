// @ts-nocheck
module.exports = {
  async afterCreate({ params, result }) {
  console.log("🚀 ~ result :", result )
  console.log("🚀 ~ params,:", params,)

    

    try {
      const user = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({
          where: {
            id: params?.data?.userId,
          },
        });

      console.log("🚀 ~ user:", user);

      const products = []

      const order = await strapi.db
        .query("api::product-cart.product-cart")
        .findMany({
          where: {
            order: params?.data?.orderId,
          },
          populate: {
            product: {
              MainImage : true
            }
          },
          orderBy : {
            createdAt : 'DESC'
          }
        });

      console.log("🚀 ~ order:", order);

      order.map((item) => {
        products.push({
          name : item?.product.Title,
          quantity :item?.quantity,
          price : item?.Price
        });
      })

      console.log(products)

      await strapi
        .plugin("email-designer")
        .service("email")
        .sendTemplatedEmail(
          {
            to: user?.email,
            from: 'vohuythanh2003@gmail.com',
            replyTo: user?.email,
          },
          {
            templateReferenceId: 1,
            subject: `Thank you for your order`,
          },
          {
            orderId: params?.data?.orderId,
            createdDate : '13/04/2024',
            products,
            subtotal : 250,
            shipFee : 5,
            totalItems : products.length,
            total : 125
          }
        );
    } catch (err) {
      console.log(err);
    }
  },
};
