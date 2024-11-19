module.exports = {
  async afterCreate({ params }) {
    try {
      const pd = await strapi.db.query("api::product.product").findOne({
        where: {
          id: params?.data.product,
        },
      });

      const cmts = await strapi.db.query("api::comment.comment").findMany({
        where: {
          product: params?.data.product,
        },
      });

      const ratePoints = cmts.reduce((accumulator, currentValue) => {
        return accumulator + currentValue?.rate;
      }, 0);

      const uppd = await strapi.db.query("api::product.product").update({
        where: {
          id: params?.data.product,
        },
        data: {
          ["Review_" + params?.data.rate]:
            pd["Review_" + params?.data.rate] + 1,
          Rate: Number((ratePoints / cmts.length).toFixed(1)),
        },
      });
      console.log("🚀 ~ uppd:", uppd);
    } catch (err) {
      throw err;
    }
  },

  async beforeDelete({ params }) {
    try {
      const cmt = await strapi.db.query("api::comment.comment").findOne({
        where: {
          id: params?.where?.id,
        },
        populate: {
          product: true,
        },
      });

      const cmts = await strapi.db.query("api::comment.comment").findMany({
        where: {
          product: cmt?.product?.id,
        },
      });

      const ratePoints = cmts.reduce((accumulator, currentValue) => {
        if (currentValue.id === params?.where?.id) {
          return accumulator;
        }
        return accumulator + currentValue.rate;
      }, 0);

      console.log("🚀 ~ ratePoints:", ratePoints)

      const uppd = await strapi.db.query("api::product.product").update({
        where: {
          id: cmt?.product.id,
        },
        data: {
          ["Review_" + cmt?.rate]: cmt?.product["Review_" + cmt?.rate] - 1,
          Rate: Number((ratePoints / (cmts.length-1)).toFixed(1)) || 0,
        },
      });
      console.log('Number((ratePoints / (cmts.length-1)).toFixed(1))', Number((ratePoints / (cmts.length-1)).toFixed(1)))
    } catch (err) {
      throw err;
    }
  },
};
