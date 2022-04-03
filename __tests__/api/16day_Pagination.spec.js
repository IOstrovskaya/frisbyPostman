const frisby = require('frisby');
const { STATUS_CODES } = require('http');
const Joi = frisby.Joi;

describe('Postman APIs testing: Day 16', () => {

  it('API status 200', () => {
    //const params = new URLSearchParams({ gender: 'female' });
    return frisby.get('http://xkcd.com/')
    .expect('status', 200)
  });

  it('Page access correct', () => {
    const page = 1;
    return frisby.get('http://xkcd.com/' + page + '/info.0.json')
    .expect('status', 200)
    .then((result) => {
      console.log(result.json);
    });
  });

  it('API 404 status for zero page', () => {
    const page = '0';
    return frisby.get('http://xkcd.com/' + page + '/info.0.json')
    .expect('status', 404)
    .then((result) => {
      console.log(result.body);
    });
  });

  it('API 404 status for unexisted page (exist: 1 - 403)', () => {
    const page = '404';
    return frisby.get('http://xkcd.com/' + page + '/info.0.json')
    .expect('status', 404)
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