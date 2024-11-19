module.exports = {
  async afterCreate({ params, result }) {
    console.log(params)
    try {
      const entry = await strapi.db
        .query("api::cart.cart")
        .findOne({
          where: {
            ID: params?.data?.cart?.connect
              ? params?.data?.cart?.connect[0]?.id
              : params?.data?.cart,
          },
        })
        .catch((err) => {
          throw new Error(err);
        });

      const updateCart = await strapi.db
        .query("api::cart.cart")
        .update({
          where: {
            ID: params?.data?.cart?.connect
              ? params?.data?.cart?.connect[0]?.id
              : params?.data?.cart,
          },
          data: {
            TotalPrice: Math.ceil(entry?.TotalPrice + params?.data?.Price) ,
          },
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (err) {
      throw err;
    }
  },
  async beforeUpdate({ params }) {
    try {
      const entry = await strapi.db
        .query("api::product-cart.product-cart")
        .findOne({
          where: {
            ID: params?.where?.id,
          },
          populate: {
            cart: true,
          },
        })
        .catch((err) => {
          throw new Error(err);
        });

      const cartEntry = await strapi.db
        .query("api::cart.cart")
        .update({
          where: {
            ID: entry?.cart?.id,
          },
          data: {
            TotalPrice: Math.ceil(entry?.cart?.TotalPrice - entry?.Price) ,
          },
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (err) {
      throw new Error(err);
    }
  },

  async afterUpdate({ params }) {
    try {
      const entry = await strapi.db
        .query("api::product-cart.product-cart")
        .findOne({
          where: {
            ID: params?.where?.id,
          },
          populate: {
            cart: true,
          },
        })
        .catch((err) => {
          throw new Error(err);
        });


      const cartEntry = await strapi.db
        .query("api::cart.cart")
        .update({
          where: {
            ID: entry?.cart?.id,
          },
          data: {
            TotalPrice: Math.ceil(entry?.cart?.TotalPrice + entry?.Price) ,
          },
        })
        .catch((err) => {
          throw new Error(err);
        });
      
    } catch (err) {
      throw new Error(err);
    }
  },

  async beforeDelete({params}) {
    try {
        const entry = await strapi.db
        .query("api::product-cart.product-cart")
        .findOne({
          where: {
            ID: params?.where?.id,
          },
          populate: {
            cart: true,
          },
        })
        .catch((err) => {
          throw new Error(err);
        });

        if(entry?.cart?.id){
          const uc = await strapi.db.query("api::cart.cart").update({
              where : {
                  ID : entry?.cart?.id
              },
              data :{
                  TotalPrice : Math.ceil(entry?.cart?.TotalPrice - entry?.Price) 
              }
          })
        }

    }catch (err) {
        throw new Error(err);
    }


  }
};
