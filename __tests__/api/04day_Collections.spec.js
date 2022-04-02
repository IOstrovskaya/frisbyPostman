const frisby = require('frisby');
const Joi = frisby.Joi;
describe('Postman APIs testing: Day 04', () => {
  it('Auth with API-key Status 200 response', () => {
    return frisby.get('https://api.getpostman.com/collections')
      .expect('status', 200);
  });
  
  var api_key = 
  it('Response contain collections', () => {
    return frisby.get('https://api.getpostman.com/collections')
      
  });
});

//prevent console from closure
require('readline')
.createInterface(process.stdin, process.stdout)
.question("Press [Enter] to exit...", function () {
  process.exit();
});