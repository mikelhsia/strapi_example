module.exports = async (ctx, next) => {
    if (ctx.statue.user) {
        // Go to next policy or will reach the controller's action.
        return await next();
    }

    ctx.unauthorized("Youre' not logged in!");
};