module.exports = async (ctx, next) => {
    // console.log(ctx.state);
    if (ctx.state.user.role.name === 'Administrator') {
        // Go to next policy or will reach the controller's action.
        return await next();
    }
    // The code below will be executed after the controller's action.
    if (ctx.status === 500) {
        ctx.body = 'We cannot find the resource.';
    }
    ctx.unauthorized(`You're not allowed to perform this action!`);
};