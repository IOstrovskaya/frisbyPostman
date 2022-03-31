const { Console } = require('console');
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
    .expect('json','previous', null)
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

  it('Get specific planet name', () => {
    return frisby.get('https://swapi.dev/api/planets/')
      .expect(result => {
        const body = result.json;
        const planetName1 = body.results.find(result => result.name === 'Tatooine');
        return expect(planetName1).not.toBeUndefined();

      });
  });

  it('Species Status 200 response', () => {
    return frisby.get('https://swapi.dev/api/species')
      .expect('status', 200);
  });

  it('Species get info types', () => {
    return frisby.get('https://swapi.dev/api/species')
    .expect('jsonTypes', 'count', Joi.number())
    .expect('json', 'next', 'https://swapi.dev/api/species/?page=2')
    .expect('json','previous', null)
    .expect('jsonTypes', 'results.*', {
      name: Joi.string(),
      classification: Joi.string(),
      designation: Joi.string(),
      average_height: Joi.string(),
      skin_colors: Joi.string(),
      hair_colors: Joi.string(),
      eye_colors: Joi.string(),
      average_lifespan: Joi.string(),
      //homeworld: Joi.string().uri(),
      language: Joi.string(),
      created: Joi.string(),
      edited: Joi.string(),
      url: Joi.string().uri(),
      people: Joi.array(),
      films: Joi.array()
    });
  });

  
  var expected_value;
  it('Count tall species (average height >100 units) correct data appearence', () => {
    let talls_count = 0;
    frisby.get('https://swapi.dev/api/species')
    .expect('status', 200)
    .then(function (res) {
      expected_value = res.body.results;      
      for (let index = 0; index < 9; index++) {
        const block = frisby.get('https://swapi.dev/api/species')
        .expect('json', expected_value[index]);
        if (block.average_height < 100) {
          talls_count += 1;
        }
      };
      console.log('Tall species count: ' + talls_count);
    });
    
    
  });
    
});

//prevent console from closure
require('readline')
.createInterface(process.stdin, process.stdout)
.question("Press [Enter] to exit...", function () {
  process.exit();
});