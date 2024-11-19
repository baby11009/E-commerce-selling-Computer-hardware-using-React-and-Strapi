"use strict";

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async refundHandler(ctx) {
    try {
      const pd = await strapi.db.query("api::order.order").findOne({
        where: {
          id: ctx.params?.id,
        },
        populate: {
          product_carts: true,
        },
      });

      pd?.product_carts?.map(async (item) => {
        const pcd = await strapi.db
          .query("api::product-cart.product-cart")
          .findOne({
            where: {
              id: item?.id,
            },
            populate: true,
          });

        const pds = await strapi.db.query("api::product.product").update({
          where: {
            id: pcd?.product?.id,
          },
          data: {
            Quantity: pcd?.product?.Quantity + pcd?.quantity,
          },
        });

      });

      const dltOrder = await strapi.db.query("api::order.order").delete({
        where: {
          id: ctx.params?.id,
        },
      })

      ctx.body = pd;
    } catch (err) {
      ctx.body = err;
    }
  },
}));
