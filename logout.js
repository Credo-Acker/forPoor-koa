const Router = require('koa-router');

let logout = new Router();

logout.post('/forPoor/logout', async (ctx) => {
    console.log(ctx.request);
    ctx.status = 200;
    ctx.cookies.set('token', null, {
        httpOnly: true,  // 是否只用于http请求中获取
        overwrite: true  // 是否允许重写
    });
    ctx.body = {
        status: "ok"
    };
});

module.exports = logout.routes();
