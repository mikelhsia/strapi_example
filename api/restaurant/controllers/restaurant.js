'use strict';
const { sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    find: async ctx => {
        let entities;

        if (ctx.query._q) {
            entities = await strapi.services.restaurant.search(ctx.query);
        } else {
            entities = await strapi.services.restaurant.find(ctx.query);
        }

        // return entities.map(entity => sanitizeEntity(entity, {model: strapi.models.restaurant }));
        return entities.map(entity => {
            let restaurant = sanitizeEntity(entity, {model: strapi.models.restaurant});
            if (restaurant.chefs) {
                restaurant.chefs.forEach(x => delete x.email);
            }
            return restaurant;
        });
    },
    findOne: async ctx => {
        const { id } = ctx.params;
        const entity = await strapi.services.restaurant.findOne({ id });
        return sanitizeEntity(entity, { model: strapi.models.restaurant });
    },
    hello: async ctx => {
        return `Hello World`;
    },
    countSearch: async ctx => {
        let entity = strapi.query('restaurant').countSearch({ _q: 'my search query'});
        // console.log(entity);

        return sanitizeEntity(entity, {model: strapi.models.restaurant});
    }
};
