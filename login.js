const Router = require('koa-router');
const { User, Login } = require('./db.js');
const { findUser, findLoginUser } = require('./controller.js');
const createToken = require('./createToken.js');
const md5 = require('md5');
const sha1 = require('sha1');

let login = new Router();
login.post('/forPoor/login', async (ctx) => {
    //ok: 登陆成功
    //no: 账户不存在
    //false: 密码错误

    let data = {
        username: ctx.request.body.username,
        password: md5(sha1(ctx.request.body.password))
    };
    let docs = await findUser({ username: data.username });

    console.log("login 请求");

    if (!docs) {
        console.log("没有此用户");
        ctx.status = 200;
        ctx.body = {
            status: "no"
        }
    } else {
        if (docs.password !== data.password) {
            console.log(docs.password, data.password);
            console.log("密码错误");
            ctx.status = 200;
            ctx.body = {
                status: "false"
            }
        } else if (docs.password === data.password) {
            let token = createToken(data.username);

            ctx.status = 200;
            ctx.cookies.set('token', token, {
                httpOnly: true,  // 是否只用于http请求中获取
                overwrite: true  // 是否允许重写
            });
            console.log(ctx.request);
            ctx.body = {
                status: "ok",
                headImg: docs.headImg,
                username: docs.username
            };
        }
    }
});

module.exports = login.routes();
