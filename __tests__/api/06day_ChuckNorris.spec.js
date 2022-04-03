const frisby = require('frisby');
const Joi = frisby.Joi;

describe('Postman APIs testing: Day 06', () => {
  
  it('API Status 200 response', () => {
    return frisby.get('https://api.chucknorris.io/')
    .expect('status', 200);
  });

  it('Correct body response types', () => {
    return frisby.get('https://api.chucknorris.io/jokes/random')
    .expect('status', 200)
    .then((result) => {
      console.log(result.json)
    })
    .expect('jsonTypes','categories', Joi.array())
    .expect('jsonTypes','created_at', Joi.string())
    .expect('jsonTypes','icon_url', Joi.string().uri())
    .expect('jsonTypes','id', Joi.string())
    .expect('jsonTypes','updated_at', Joi.string())
    .expect('jsonTypes','url', Joi.string().uri())
    .expect('jsonTypes','value', Joi.string())
  });

  it('Get random joke', () => {
    return frisby.get('https://api.chucknorris.io/jokes/random')
    .expect('status', 200)
    .then((result) => {
      console.log(result.json);
      const joke = result.json.value;
      console.log(joke);
    })
  });

});

//prevent console from closure
require('readline')
.createInterface(process.stdin, process.stdout)
.question("Press [Enter] to exit...", function () {
  process.exit();
});