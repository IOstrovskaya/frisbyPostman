const frisby = require("frisby");
const {BASE_URL} = require('../config/27day_test-config')
module.exports = function login(username, password) {
    return frisby,post('http://security.postman-breakable.com/user/login', {username, password})
    .expect('status', 200)
    .then((result) => {
        const body = result.json;
        const token = body.response.session_token;
        frisby.globalSetup({
            request: {
                headers: {
                    'x-api-key': token,
                    'Content-Type': 'application/json',
                }
            }
        });
    });
};