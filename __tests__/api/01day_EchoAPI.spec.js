const frisby = require('frisby');
const Joi = frisby.Joi;
describe('Postman APIs testing: Day 01', () => {
  
  it('Post data with Postman Echo API', () => {
    return frisby.post('https://postman-echo.com/post', {
      payload: 'hello world!',
    })
    .expect('status', 200)
    .expect('json', 'data', {
      payload: 'hello world!'
    })
    .then((result) => {
      console.log(result.json);
      })
  });

  it('Json body response fields check', () => {
    return frisby.post('https://postman-echo.com/post')
    .expect('json', 'args',{})
    .expect('json', 'data',{})
    .expect('json', 'files',{})
    .expect('json', 'form',{})
    .expect('jsonTypes', 'headers', Joi.object())
  });

});

//prevent console from closure
require('readline')
.createInterface(process.stdin, process.stdout)
.question("Press [Enter] to exit...", function () {
  process.exit();
});