'use strict';
const { sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    findOne: async ctx => {
        const { id } = ctx.params;
        const entity = await strapi.services.restaurant.findOne({ id });
        return sanitizeEntity(entity, { model: strapi.models.restaurant });
    },
    hello: async ctx => {
        return `Hello World`;
    },
};
