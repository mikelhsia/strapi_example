'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async create(ctx) {
        let entity;
        if (ctx.is('multipart')) {
            const {data, files} = parseMultipartData(ctx);
            data.author = ctx.state.user.id;
            entity = await strapi.services.article.create(data, {files});
        } else {
            ctx.request.body.author = ctx.state.user.id;
            entity = await strapi.services.article.create(ctx.request.body);
        }

        return sanitizeEntity(entity, { model: strapi.models.article });
    },
    async update(ctx) {
        let entity;
        const { id } = ctx.params;
        console.log(ctx.params);
        console.log(id);

        const [article] = await strapi.services.article.find({
            id: ctx.params.id,
            'author_id': ctx.state.user.id
        });

        if (!article) {
            return ctx.unauthorized(`You can't update this entry`);
        }

        if (ctx.is('multipart')) {
            const {data, files} = parseMultipartData(ctx);
            entity = await strapi.services.article.update({id}, data, {files});
        } else {
            entity = await strapi.services.article.create({id}, ctx.request.body); 
        }

        return sanitizeEntity(entity, {model: strapi.models.article});
    }
};
