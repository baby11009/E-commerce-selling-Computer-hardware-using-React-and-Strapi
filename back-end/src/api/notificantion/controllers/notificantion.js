// @ts-nocheck
"use strict";

/**
 * notificantion controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::notificantion.notificantion",
  ({ strapi }) => ({
    async changeState(ctx) {
      console.log(ctx.request.body);
      try {
        const data = await strapi.db
          .query("api::notificantion.notificantion")
          .findMany({
            where: {
              user : ctx.params?.id || null,
            }
          });

        data?.map(async (item) => {
            const nt = await strapi.db.query("api::notificantion.notificantion").update({
                where : {
                    id : item?.id
                },
                data : ctx.request.body
            });
        })

        
        ctx.body = "Change notification state to seen success";
      } catch (err) {
        ctx.body = err;
      }
    },
  })
);
