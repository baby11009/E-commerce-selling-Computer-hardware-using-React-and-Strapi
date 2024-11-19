module.exports = {
  async afterCreate({ params, result }) {
    console.log(result);

    try {
      const entry = await strapi.db
        .query("api::cart.cart")
        .findOne({
          where: {
            user: params?.data?.user,
          },
        })
        .catch((err) => {
          throw new Error(err);
        });

      const update = await strapi.db.query("api::cart.cart").update({
        where: {
          Id: entry?.id,
        },
        data: {
          product_carts: [],
          TotalPrice: 0,
        },
      });

      const pdc = await strapi.db
        .query("api::product-cart.product-cart")
        .findMany({
          where: {
            order: result?.id,
          },
          populate: {
            product: true,
          },
        });

      let products = [];

      pdc?.map(async (item) => {
        products.push({
          name: item?.product.Title,
          quantity: item?.quantity,
          price: item?.Price,
        });

        const updatePd = await strapi.db
          .query("api::product.product")
          .update({
            where: {
              id: item?.product?.id,
            },
            data: {
              Quantity: item?.product?.Quantity - item?.quantity,
            },
          })
          .catch((err) => {
            throw err;
          });
      });

      const user = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({
          where: {
            id: params?.data?.user,
          },
        });

      await strapi
        .plugin("email-designer")
        .service("email")
        .sendTemplatedEmail(
          {
            to: user?.email,
            from: "vohuythanh2003@gmail.com",
            replyTo: user?.email,
          },
          {
            templateReferenceId: 1,
            subject: `Thank you for your order`,
          },
          {
            orderId: result?.orderId,
            createdDate: result?.createdAt,
            products,
            subtotal: result?.orderPrice,
            tax: Math.ceil((result?.orderPrice * 5) / 100),
            shipFee: result?.shipFee,
            coupon: result?.orderDiscount || 0,
            discount: Math.ceil(
              (result?.orderPrice * (result?.orderDiscount || 0)) / 100
            ),
            totalItems: products.length,
            total:
              result?.orderPrice +
              Math.ceil((result?.orderPrice * 5) / 100) +
              result?.shipFee -
              Math.ceil(
                (result?.orderPrice * (result?.orderDiscount || 0)) / 100
              ),
          }
        );

      const noti = await strapi.db
        .query("api::notificantion.notificantion")
        .create({
          data: {
            user: params?.data?.user,
            notification_type: 1,
            Message: "Order placed successfully",
            notification_state: 2,
            publishedAt: new Date(),
          },
        });
    } catch (err) {
      throw err;
    }
  },
  async beforeDelete({ params }) {
    console.log("params", params);
    try {
      const order = await strapi.db.query("api::order.order").findOne({
        where: {
          id: params?.where?.id,
        },
        populate: {
          product_carts: true,
        },
      });

      console.log("order", order);

      order?.product_carts?.map(async (item) => {
        console.log("item", item?.id);
        const dltPd = await strapi.db
          .query("api::product-cart.product-cart")
          .delete({
            where: {
              id: item?.id,
            },
          });

        console.log("dltPd", dltPd);
      });
    } catch (err) {
      throw err;
    }
  },
};
