const frisby = require('frisby');
const {USERNAME, PASSWORD, USER_ID} = require('../config/27day_test-config')
describe('Postman APIs testing: Day 27', () => {
  it('User should be able to login and get user status', () => {
    return frisby.post('http://security.postman-breakable.com/user/login', {
      username: USERNAME,
      password: PASSWORD,
    })
    .expect('status', 200)
    .then((result) => {
      console.log(result.json);
      const data = result.json;
      const token = data.response.session_token;
      return frisby.fetch('http://security.postman-breakable.com/user', {
        method: 'get',
        headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'x-api-key': token,
        },
      })
      .expect('status', 200)
      .then((result) => {
        console.log(result.json);
      });
    });
  });
   
  it('Get account info after successful login', () => {
    return frisby.post('http://security.postman-breakable.com/user/login', {
      username: USERNAME,
      password: PASSWORD,
    })
    .expect('status', 200)
    .then((result) => {
      const data = result.json;
      const token = data.response.session_token;
      const user_id = data.response.user_id;
      return frisby.fetch('http://security.postman-breakable.com/account/' + user_id + '/summary', {
        method: 'get',
        headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'x-api-key': token,

        },
        query_params: user_id,
      })
      .expect('status', 200)
      .then((result) => {
        console.log(result.json);
      });
    });
  });

  it('Log out option check', () => {
    return frisby.post('http://security.postman-breakable.com/user/login', {
      username: USERNAME,
      password: PASSWORD,
    })
    .expect('status', 200)
    .then((result) => {
      const data = result.json;
      const token = data.response.session_token;
      return frisby.fetch('http://security.postman-breakable.com/user/logout', {
        method: 'get',
        headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'x-api-key': token,

        },
      })
      .expect('status', 200)
      .then((result) => {
        console.log(result.json);
      });
    });
  });

  it('User should not be able to get acc info after logout', () => {
    return frisby.post('http://security.postman-breakable.com/user/login', {
      username: USERNAME,
      password: PASSWORD,
      user_id: USER_ID,
    })
    .expect('status', 200)
    .then((result) => {
      const data = result.json;
      const token = data.response.session_token;
      return frisby.fetch('http://security.postman-breakable.com/user/logout', {
        method: 'get',
        headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'x-api-key': token,

        },
      })
    })
    .expect('status', 200)
    .then((result) => {
      const data = result.json;
      const token = data.response.session_token;
      const user_id = data.response.user_id;
      return frisby.fetch('http://security.postman-breakable.com/account/' + user_id + '/summary', {
        method: 'get',
        headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'x-api-key': token,
        },
      })
      .expect('status', 403)
      .then((result) => {
      console.log(result.json);
      });
    });
  });

});

//prevent console from closure
require('readline')
.createInterface(process.stdin, process.stdout)
.question("Press [Enter] to exit...", function () {
  process.exit();
});