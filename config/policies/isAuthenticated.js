module.exports = async (ctx, next) => {
    if (ctx.state.users) {
        // Go to next policy or will reach the controller's action.
        return await next();
    }

    ctx.unauthorized("Youre' not logged in!");
};