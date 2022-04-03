const frisby = require('frisby');
const Joi = frisby.Joi;

describe('Postman APIs testing: Day 07', () => {
  
  it('API Status 404 response if not specificators', () => {
    return frisby.get('https://api.nasa.gov/planetary')
    .expect('status', 404);
  });

  it('API Status 403 response if no api key provided', () => {
    return frisby.get('https://api.nasa.gov/planetary/apod')
    .expect('status', 403);
  });

  it('API Status 200 response', () => {
    return frisby.fetch('https://api.nasa.gov/planetary/apod', {
      method: 'get',
      headers: {
        Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': 'DEMO_KEY',

      },
    })
    .expect('status', 200)
    .then((result) => {
      console.log(result.json);
    });
  });

  it('Check types of info in response body', () => {
    return frisby.fetch('https://api.nasa.gov/planetary/apod', {
        method: 'get',
        headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'x-api-key': 'DEMO_KEY',
        },
      })
    .expect('status', 200)
    .expect('jsonTypes', {
      copyright: Joi.string(),
      date: Joi.string(),
      explanation: Joi.string(),
      hdurl: Joi.string().uri(),
      media_type: Joi.string(),
      service_version: Joi.string(),
      title: Joi.string(),
      url: Joi.string().uri(),
    });
  });

  it('Get different images number', () => {
    const params = new URLSearchParams({ count: 2 });
    const key = new URLSearchParams({ api_key: 'DEMO_KEY' });
    return frisby.fetch('https://api.nasa.gov/planetary/apod' + '?' + key + '&' + params, {
      method: 'get',
      headers: {
        Accept: 'application/json',
                'Content-Type': 'application/json',
      },
    })
    .expect('status', 200)
    .then((result) => {
      console.log(result.json);
    });
  });

  it('Debugging task in postman: get all titles and url of images', () => {
    const temp_count = 3; 
    const params = new URLSearchParams({ count: temp_count });
    const key = new URLSearchParams({ api_key: 'DEMO_KEY' });
    return frisby.fetch('https://api.nasa.gov/planetary/apod' + '?' + key + '&' + params, {
      method: 'get',
      headers: {
        Accept: 'application/json',
                'Content-Type': 'application/json',
      },
    })
    .expect('status', 200)
    .then((result) => {
      console.log(result.json);
    })
    .then(function (result) {
      const count = temp_count;
      for (let index = 0; index < count; index++) {
        const imagetitle = result.json[index].title;
        const imageurl = result.json[index].url;
        console.log('Image ' + index+1 + ': ' + '\n'
        + '   ' + 'Title: ' + imagetitle + '\n'
        + '   ' + 'URL: ' + imageurl + '\n')
      }
    })
  });

});

//prevent console from closure
require('readline')
.createInterface(process.stdin, process.stdout)
.question("Press [Enter] to exit...", function () {
  process.exit();
});