const jw = require('jsonwebtoken');

const secret_key = "MostSecretKey";

function generateT(payload) {

    let token = jw.sign(payload, secret_key);
    return token;
}

module.exports = {
    generateT,
}