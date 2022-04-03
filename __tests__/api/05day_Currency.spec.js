const frisby = require('frisby');
const Joi = frisby.Joi;

describe('Postman APIs testing: Day 05', () => {
  
  it('API Status 200 response', () => {
    return frisby.get('https://api.coindesk.com/v1/bpi/currentprice/btc.json')
    .expect('status', 200)
    .then((result) => {
      console.log(result.body);
    });
  });

  it('Change currency in response', () => {
    const currency = 'usd';
    return frisby.get('https://api.coindesk.com/v1/bpi/currentprice/' + currency + '.json')
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