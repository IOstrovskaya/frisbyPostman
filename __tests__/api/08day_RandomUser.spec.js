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
  
  it('Correct data types in response body', () => {
    return frisby.get('https://randomuser.me/api')
    .expect('status', 200)
    .expect('jsonTypes','results', Joi.array().required())
    .then((result) => {
      console.log(result.json.results[0]);
    })
    .expect('jsonTypes', 'results[0]', {
      gender: Joi.string().required(),
      name: {
        title: Joi.string().required(),
        first: Joi.string().required(),
        last: Joi.string().required(),
      },
      location: {
        street: {
          number: Joi.number().required(),
          name: Joi.string().required(),
        },
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        postcode: [ 
          Joi.string(),
          Joi.number(),
        ],
        coordinates: {
          latitude: Joi.number().required(),
          longitude: Joi.number().required(),
        },
        timezone: {
          offset: Joi.string().required(),
          description: Joi.string().required(),
        },
      },
      email: Joi.string().required(),
      login: {
        uuid: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        salt: Joi.string().required(),
        md5: Joi.string().required(),
        sha1: Joi.string().required(),
        sha256: Joi.string().required(),
      },
      dob: {
        date: Joi.string().required(),
        age: Joi.number().required(),
      },
      registered: {
        date: Joi.string().required(),
        age: Joi.number().required(),
      },
      phone: Joi.string().required(),
      cell: Joi.string().required(),
      id: {
        name: Joi.string().required().allow(''),
        value: [
          Joi.number(),
          Joi.string(),
          null,
        ],
      },
      picture: {
        large: Joi.string().uri().required(),
        medium: Joi.string().uri().required(),
        thumbnail: Joi.string().uri().required(),
      },
      nat: Joi.string().required(),
    })
    .expect('jsonTypes','info', {
      seed: Joi.string().required(),
      results: Joi.number().required(),
      page: Joi.number().required(),
      version: Joi.string().required(),
    })
  });

  it('Get female user', () => {
    const params = new URLSearchParams({ gender: 'female' });
    return frisby.fetch('https://randomuser.me/api' + '?' + params, {
      method: 'get',
      headers: {
        Accept: 'application/json',
                'Content-Type': 'application/json',
      },
    })
    .expect('status', 200)
    .then((result) => {
      console.log('Gender of user is ' +  result.json.results[0].gender);
      console.log(result.body);
    })
  });

  it('Get female french user', () => {
    const params = new URLSearchParams({ gender: 'female', nat: 'FR' });
    return frisby.fetch('https://randomuser.me/api' + '?' + params, {
      method: 'get',
      headers: {
        Accept: 'application/json',
                'Content-Type': 'application/json',
      },
    })
    .expect('status', 200)
    .then((result) => {
      console.log('Gender of user is ' +  result.json.results[0].gender + ' from ' +result.json.results[0].nat);
      console.log(result.body);
    })
  });

});

//prevent console from closure
require('readline')
.createInterface(process.stdin, process.stdout)
.question("Press [Enter] to exit...", function () {
  process.exit();
});