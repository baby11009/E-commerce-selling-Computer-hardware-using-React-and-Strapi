'use strict';

/**
 * gift service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::gift.gift');
