const Router = require('koa-router');
const jwt = require('jsonwebtoken');
let testApp = new Router();

testApp.post('/forPoor/session', async (ctx) => {
    console.log(ctx.request);
    let userToken = ctx.cookies.get('token');

    tokenContent = await jwt.verify(userToken, 'credo', (err, decoded) => {
        if (!err) {
            console.log(decoded);
            ctx.status = 200;
            ctx.body = { status: "ok" };
        } else {
            ctx.status = 200;
            ctx.body = { status: "false" };
        }
    });//如果token过期或验证失败，将抛出错误

});

module.exports = testApp.routes();
