const frisby = require('frisby');
const Joi = frisby.Joi;
describe('Postman APIs testing: Day 13', () => {
  it('Planets Status 200 response', () => {
    return frisby.get('https://swapi.dev/api/planets/')
      .expect('status', 200);
  });
  
  it('Planets get info types', () => {
    return frisby.get('https://swapi.dev/api/planets/')
      .expect('jsonTypes', 'count', Joi.number())
      .expect('json', 'next', 'https://swapi.dev/api/planets/?page=2')
      .expect('jsonTypes', 'results.*', {
        name: Joi.string(),
        rotation_period: Joi.number(),
        orbital_period: Joi.number(),
        diameter: Joi.number(),
        climate: Joi.string(),
        gravity: Joi.string(),
        terrain: Joi.string(),
        surface_water: Joi.string(),
        population: Joi.string(),
        created: Joi.string(),
        edited: Joi.string(),
        url: Joi.string().uri(),
        residents: Joi.array(),
        films: Joi.array()
      });
  });
});

//prevent console from closure
require('readline')
.createInterface(process.stdin, process.stdout)
.question("Press [Enter] to exit...", function () {
  process.exit();
});