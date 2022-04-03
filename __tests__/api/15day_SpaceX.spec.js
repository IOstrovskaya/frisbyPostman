const frisby = require('frisby');
const Joi = frisby.Joi;

describe('Postman APIs testing: Day 15', () => {

  it('API status 200', () => {
    //const params = new URLSearchParams({ gender: 'female' });
    return frisby.get('https://api.spacexdata.com/v4/launches/latest')
    .expect('status', 200)
    .then((result) => {
      console.log(result.json);
    })
  });

  it('Correct data types in response body', () => {
    return frisby.get('https://api.spacexdata.com/v4/launches/latest')
    .expect('status', 200)
    .expect('jsonTypes','fairings', null)
    .expect('jsonTypes','links', {
      patch: {
        small: Joi.string().uri(),
        large: Joi.string().uri(),
      },
      reddit: {
        campaign: null,
        launch: Joi.string().uri(),
        media: null,
        recovery: null,
      },
      flickr: {
        small: Joi.array(),
        original: Joi.array(),
      },
      presskit: null,
      webcast: Joi.string().uri(),
      youtube_id: Joi.string(),
      article: null,
      wikipedia: null
    })
    .expect('jsonTypes','static_fire_date_utc', null)
    .expect('jsonTypes','static_fire_date_unix', null)
    .expect('jsonTypes','net', Joi.boolean())
    .expect('jsonTypes','window', null)
    .expect('jsonTypes','rocket', Joi.string())
    .expect('jsonTypes','success', Joi.boolean())
    .expect('jsonTypes','failures', Joi.array())
    .expect('jsonTypes','details', null)
    .expect('jsonTypes','crew', Joi.array())
    .expect('jsonTypes','ships', Joi.array())
    .expect('jsonTypes','capsules', Joi.array())
    .expect('jsonTypes','payloads', Joi.array())
    .expect('jsonTypes','launchpad', Joi.string())
    .expect('jsonTypes','flight_number', Joi.number())
    .expect('jsonTypes','name', Joi.string())
    .expect('jsonTypes','date_utc', Joi.string())
    .expect('jsonTypes','date_unix', Joi.number())
    .expect('jsonTypes','date_local', Joi.string())
    .expect('jsonTypes','date_precision', Joi.string())
    .expect('jsonTypes','upcoming', Joi.boolean())
    .expect('jsonTypes','cores[0]', {
      core: Joi.string(),
      flight: Joi.number(),
      gridfins: Joi.boolean(),
      legs: Joi.boolean(),
      reused: Joi.boolean(),
      landing_attempt: Joi.boolean(),
      landing_success: Joi.boolean(),
      landing_type: Joi.string(),
      landpad: Joi.string(),
    })
    .expect('jsonTypes','auto_update', Joi.boolean())
    .expect('jsonTypes', 'tbd', Joi.boolean())
    .expect('jsonTypes','launch_library_id',Joi.string())
    .expect('jsonTypes','id',Joi.string())
  });

});

//prevent console from closure
require('readline')
.createInterface(process.stdin, process.stdout)
.question("Press [Enter] to exit...", function () {
  process.exit();
});