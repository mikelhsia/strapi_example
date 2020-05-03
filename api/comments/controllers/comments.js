'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
const Filter = require('bad-words');
const filter = new Filter();

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {    
    create: async ctx => {
        let entity;
        let id;
        let articleId;
        let user;
        let article;

        id = ctx.request.body.user;
        articleId = ctx.request.body.author;

        user = await strapi.query('user', 'users-permissions').findOne({"id": id});
        article = await strapi.query('article').findOne({"id": articleId});
        
        if (!user && !article) {
            throw new Error('No user or article matched in DB');
        }

        if (ctx.is('multipart')) {
            const {data, files} = parseMultipartData(ctx);
            entity = await strapi.services.comments.create(data, {files});
        } else {
            entity = await strapi.services.comments.create(ctx.request.body);
        }


        // Check if the comment content contains a bad word
        if (entity.comment === filter.clean(entity.comment)) {
            // send an email by using the email plugin if it's a valid email content with no bad-words
            if (entity.user && entity.user.email) {
                // console.log("Start sending email");
                try {
                    await strapi.services.comments.send(
                        "mikelhsia@hotmail.com",
                        entity.user.email,
                        'You have a new comment',
                        `Here is your new comment:
                        ${entity.comment}`
                    );
                } catch (error) {
                    throw new Error (error);
                }
                // console.log("Done sending email");
            }
        }

        let entry = sanitizeEntity(entity, { model: strapi.models.comments });
        return entry;
    },
};
