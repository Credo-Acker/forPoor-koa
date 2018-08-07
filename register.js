const Router = require('koa-router');
const md5 = require('md5');
const sha1 = require('sha1');
const fs = require('fs');
const { User, Login } = require('./db.js');
const { findUser, findLoginUser, createUser } = require('./controller.js');
const createToken = require('./createToken.js');

let register = new Router();

register.post('/forPoor/register', async (ctx) => {
    //ok: 注册成功
    //had: 账户已存在
    let url = "http://backforpoor.credog.top/imgs/";
    let data = {
    	username: ctx.request.body.username,
    	password: md5(sha1(ctx.request.body.password)),
    	headImg: url + ctx.request.body.headImg,
    	card: ctx.request.body.card,
    };

    console.log("register 请求");

    let docs = await findUser({ username: data.username });

    if (docs) {
        console.log('用户名已经存在');
        ctx.status = 200;
        ctx.body = {
            status: "had"
        };
    } else {
        console.log("开始存用户");
        await new Promise ((resolve, reject) => {
            User.create(data, (err, doc) => {
                if (err) {
                    reject(err);
                }
                console.log(doc);
                resolve();
            })
        }).then(() => {
            console.log("开始存照片");
            let imgData = ctx.request.body.src;
            let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
            let bufferData = new Buffer(base64Data, 'base64');

            fs.writeFile(__dirname + '/imgs/' + ctx.request.body.headImg, bufferData, (err) => {
            	if (err) {
            	    console.log("save fails");
            	} else {
            	    console.log(`save success ${data.headImg}`);
            	}
            });
        }).then(() => {
            console.log('注册成功');
            ctx.status = 200;
            ctx.body = {
                status: "ok"
            };
        }).catch((err) => {
            console.log(err);
        })
    }
});

module.exports = register.routes();
