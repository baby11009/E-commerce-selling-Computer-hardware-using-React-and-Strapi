'use strict';

/**
 * product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product',({strapi}) =>({
    async findOne(ctx) {
        const { id } = ctx.params;
        const entity = await strapi.db.query('api::product.product').findOne({
            where : { Slug: id },
            populate : ["MainImage","Images","Categories"]
        });

        const sanitizedEntity = await this.sanitizeOutput(entity,ctx);

        return this.transformResponse(sanitizedEntity);
    }
}));
