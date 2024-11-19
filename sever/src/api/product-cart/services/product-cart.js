'use strict';

/**
 * product-cart service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::product-cart.product-cart');
