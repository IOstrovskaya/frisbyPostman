const frisby = require('frisby');
const Joi = frisby.Joi;

describe('Postman APIs testing: Day 08', () => {

  it('Post new user', () => {
    const params = new URLSearchParams({ gender: 'female' });
    return frisby.post('https://postman-echo.com/post' + '?' + params, {
      name: 'Anna Maria Smith',
      email: 'annamariasmith_postman@mailforspam.com',
      id: '3132131231231231231231313123131'
    })
    .expect('status', 200)
    .then((result) => {
      console.log(result.json);
    })
  });

});

//prevent console from closure
require('readline')
.createInterface(process.stdin, process.stdout)
.question("Press [Enter] to exit...", function () {
  process.exit();
});