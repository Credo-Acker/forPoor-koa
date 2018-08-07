const Koa = require('koa');
const cors = require('koa-cors');
const server = require('koa-static');
const fs = require('fs');
const koabody = require('koa-body');
const login = require('./login.js');
const logout = require('./logout.js');
const register = require('./register.js');
const testApp = require('./test.js');

const app = new Koa();

let config = {
    credentials: true,
    origin: 'http://localhost:8080'
}

app.use(server(__dirname + '/'));
app.use(cors(config));
app.use(koabody());

app.use(register);
app.use(login);
app.use(testApp);
app.use(logout);

app.listen(2700, () => {
    console.log("I'm in post: 2700, waiting for the request");
});
