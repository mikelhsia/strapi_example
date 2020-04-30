/*
*The count query will call the count service function of the Restaurant API.
* It needs a JSON object as params, so we will add a where options in the GraphQL query. 
*/
module.exports = {
    query: `restaurantsCount(where: JSON): Int!`,
    resolver: {
        Query: {
            restaurantsCount: {
                description: 'Return the count of restaurants',
                resolverOf: 'application::restaurant.restaurant.count',
                resolver: async (obj, options, ctx) => {
                    return await strapi.api.restaurant.services.restaurant.count(options.where || {});
                },
            },
        },
    },
};