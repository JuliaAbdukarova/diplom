require('dotenv').config();

const jwt = require('jsonwebtoken');

//const sign = "testtest";
const sign = process.env.JWT_ACCESS_SECRET;

function generate (data) {
    return jwt.sign(data, sign, {expiresIn: '30d'})
}

function verify (token) {
    return jwt.verify(token, sign);
}

module.exports = {
    generate,
    verify
}