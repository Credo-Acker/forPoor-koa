const { User, Login } = require('./db.js');
const createToken = require('./createToken.js');

const findUser = (payload) => {
    //payload : { username: username }
    return new Promise ((resolve, reject) => {
        User.findOne(payload, (err, docs) => {
            if (err) {
                reject(err);
                // console.log("findUser err", err);
            }
            console.log("findUser docs", docs);
            resolve(docs);
            // return docs;
        });
    });
};

module.exports = { findUser };
//
// const createUser = (payload) => {
//     //payload : { username: username, password: password, headImg: headImg, card: card, token: token }
//     return new Promise ((reject, resolve) => {
//         User.create(payload, (err, docs) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(docs);
//         });
//     });
// };
