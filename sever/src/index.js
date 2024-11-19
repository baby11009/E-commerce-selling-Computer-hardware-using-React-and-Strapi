"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ["plugin::users-permissions.user"],
      async afterCreate({ result }) {
        try {
          // Assuming you have a Cart model with a `create` method
          const entry = await strapi.db.query("api::cart.cart").create({
            data: {
              user: result.id,
              publishedAt: new Date(),
            },
          });
        } catch (error) {
          console.error("Error creating cart:", error);
        }
      },
      async beforeDelete({ params }) {
        try {
          // Assuming you have a Cart model with a `create` method
          const cart = await strapi.query("api::cart.cart").delete({
            where: {
              user: params?.where?.id,
            },
          });
        } catch (error) {
          console.error("Error creating cart:", error);
        }
      },
    });
  },
};
