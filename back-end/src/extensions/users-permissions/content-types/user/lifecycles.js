module.exports = {
  async afterCreate({ result }) {
    try {
      // Assuming you have a Cart model with a `create` method
      const entry = await strapi.db.query("api::cart.cart").create({
        data: {
          userId: result.id,
          publishedAt: new Date(),
        },
      });
      console.log(entry);
    } catch (error) {
      console.error("Error creating cart:", error);
    }
  }
};
