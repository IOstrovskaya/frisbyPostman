const frisby = require("frisby");
const Joi = frisby.Joi;
describe("Postman APIs testing", () => {
  it("Day 13: Planets", () => {
    return frisby.get("https://swapi.dev/api/planets/")
      .expect("status", 200)
      .expect("jsonTypes", "count", Joi.number())
      .expect("json", "next", "https://swapi.dev/api/planets/?page=2")
      .expect("jsonTypes", "results.*", {
        name: Joi.string(),
        rotation_period: Joi.number(),
        orbital_period: Joi.number(),
        diameter: Joi.number(),
        climate: Joi.string(),
        gravity: Joi.string(),
        terrain: Joi.string(),
        surface_water: Joi.string(),
        population: Joi.string(),
        climate: Joi.string(),
        created: Joi.string(),
        edited: Joi.string(),
        url: Joi.string().uri()

      })
      
      /*
      .then(result => {
        const body = result.json;
        const found = body.results.find(result => result.name === 'Tatooine');
        return expect(found).not.toBeUndefined();
      });*/
  });

  
});

//prevent console from closure
require('readline')
.createInterface(process.stdin, process.stdout)
.question("Press [Enter] to exit...", function () {
  process.exit();
});