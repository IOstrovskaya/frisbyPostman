const frisby = require('frisby');
const Joi = frisby.Joi;

describe('Postman APIs testing: Day 17', () => {

  it('API status 200', () => {
    return frisby.get('https://pokeapi.co/api/v2/type')
    .expect('status', 200)
    .then((result) => {
      console.log(result.json);
    })
  });

  it('Correct data types in response body', () => {
    return frisby.get('https://pokeapi.co/api/v2/type')
    .expect('status', 200)
    .expect('jsonTypes','count', Joi.number().required())
    .expect('jsonTypes','next', [
      Joi.string(),
      Joi.number(),
      null,
    ])
    .expect('jsonTypes','previous', [
      Joi.string(),
      Joi.number(),
      null,
    ])
    .expect('jsonTypes','results.*', {
      name: Joi.string().required(),
      url: Joi.string().required(),
    })
  });

  it('Get specific pokemon info', () => {
    return frisby.get('https://pokeapi.co/api/v2/type')
    .expect('status',200)
    .expect(result => {
      const body = result.json;
      const pokemon = body.results.find(result => result.name === 'rock');
      console.log('Pokemon type: ' + pokemon.name)
    });
  });





});

//prevent console from closure
require('readline')
.createInterface(process.stdin, process.stdout)
.question("Press [Enter] to exit...", function () {
  process.exit();
});