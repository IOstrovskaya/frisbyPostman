const frisby = require('frisby');
const Joi = frisby.Joi;

describe('Postman APIs testing: Day 06', () => {
  
  it('API Status 200 response', () => {
    return frisby.get('https://api.chucknorris.io/')
    .expect('status', 200)
    .then((result) => {
      console.log(result.body);
    });
  });

 

});

//prevent console from closure
require('readline')
.createInterface(process.stdin, process.stdout)
.question("Press [Enter] to exit...", function () {
  process.exit();
});