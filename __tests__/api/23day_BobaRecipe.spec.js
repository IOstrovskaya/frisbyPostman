const frisby = require('frisby');
const Joi = frisby.Joi;

describe('Postman APIs testing: Day 23', () => {

  it('API status 200', () => {
    const Region = ['Hawaii', 'California'];
    const boba = ['100', '96'];
    const i = 1;
    return frisby.get('https://postman-echo.com/get' +'?' + Region[i] + '=' + boba[i])
    .expect('status', 200)
    .expect((result) => {
      console.log(result.json)
    });
  });

});

//prevent console from closure
require('readline')
.createInterface(process.stdin, process.stdout)
.question("Press [Enter] to exit...", function () {
  process.exit();
});