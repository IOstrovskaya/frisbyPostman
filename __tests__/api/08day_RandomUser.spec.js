const frisby = require('frisby');
const Joi = frisby.Joi;

describe('Postman APIs testing: Day 08', () => {

  it.skip('API Status 200 response', () => {
    return frisby.get('https://randomuser.me/api')
    .expect('status', 200)
    .then((result) => {
      console.log(result.body);
    });
  });

  it.skip('Correct data types in response body', () => {
    return frisby.get('https://randomuser.me/api')
    .expect('status', 200)
    //.expect('jsonTypes','results', Joi.object())
    .expect('jsonTypes','results*', {
      gender: Joi.string(),
    })
    //.expect('jsonTypes','gender', Joi.string())
    .expect('jsonTypes','name', Joi.array())
    .expect('jsonTypes','name', {
      title: Joi.string(),
      first: Joi.string(),
      last: Joi.string()
    })
    .expect('jsonTypes','location', {
      street: {
        number: Joi.number(),
        name: Joi.string(),
      },
      city: Joi.string(),
      state: Joi.string(),
      country: Joi.string(),
      postcode: Joi.number(),
      coordinates: {
        latitude: Joi.number(),
        longitude: Joi.number(),
      },
      timezone: {
        offset: Joi.number(),
        description: Joi.string(),
      },
    })
    .expect('jsonTypes', 'email', Joi.string())
    .expect('json','login', {
      uuid: Joi.string(),
      username: Joi.string(),
      password: Joi.string(),
      salt: Joi.string(),
      md5: Joi.string(),
      sha1: Joi.string(),
      sha256: Joi.string(),
    })
    .expect('jsonTypes', 'dob', {
      date: Joi.string(),
      age: Joi.number(),
    })
    .expect('jsonTypes','registered', {
      date: Joi.string(),
      age: Joi.number(),
    })
    .expect('jsonTypes', 'phone', Joi.string())
    .expect('jsonTypes', 'cell', Joi.string())
    .expect('jsonTypes', 'id', {
      name: Joi.string(),
      value: Joi.number(),
    })
    .expect('jsonTypes', 'picture', {
      large: Joi.string().uri(),
      medium: Joi.string().uri(),
      thumbnail: Joi.string().uri(),
    })
    .expect('jsonTypes','nat', Joi.string())
  });
  
  it('Correct data types in response body', () => {
    return frisby.get('https://randomuser.me/api')
    .expect('status', 200)
    .expect('jsonTypes','results', Joi.array())
    .then((result) => {
      console.log(result.json.results[0]);
    })
    .expect('jsonTypes', 'results[0]', {
      gender: Joi.string(),
    })
    
  });

});

//prevent console from closure
require('readline')
.createInterface(process.stdin, process.stdout)
.question("Press [Enter] to exit...", function () {
  process.exit();
});