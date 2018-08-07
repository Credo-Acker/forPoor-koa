const jwt = require('jsonwebtoken');

module.exports = function (username) {
    const token = jwt.sign({ username: username }, 'credo', { expiresIn: 24 * 60 * 60 });
    return token;
};
