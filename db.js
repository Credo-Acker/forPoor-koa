const mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://localhost/forPoor', (err) => {
    if (err ){
        console.log('连接forPoor失败');
    } else {
        console.log('连接forPoor成功');
    }
});

let UsersSchema = new mongoose.Schema({     //建表
    username:  {type: String, unique: true, required: true},
    password: {type: String, required: true},
    headImg: {type:String, required: true},
    card: {type: String, required: true },
});

let User = mongoose.model('users', UsersSchema);    //实例化表

module.exports = { User };
