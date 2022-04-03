const frisby = require('frisby');
const {SECRET_API_KEY} = require('D:/Documents/Git/frisbyPostman/config');

describe('Postman APIs testing: Day 12', () => {

  it('API collection status 401 without auth', () => {
    return frisby.get('https://api.getpostman.com/collections/')
    .expect('status', 401)
    .then((result) => {
      console.log(result.json);
    })
  });

  it('API collection status 401 with wrong api key', () => {
    const fake_key = '00000';
    return frisby.fetch('https://api.getpostman.com/collections/', {
      method: 'get',
        headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'x-api-key': fake_key,
        }, 
    })
    .expect('status', 401)
    .then((result) => {
      console.log(result.json);
    })
  });

  it('API collection status 200 with auth', () => {
    return frisby.fetch('https://api.getpostman.com/collections/', {
      method: 'get',
        headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'x-api-key': SECRET_API_KEY,
        }, 
    })
    .expect('status', 200)
    .then((result) => {
      console.log(result.json);
    })
  });

  it('Get single collection by collection id of 12 day collection', () => {
    const uid = '19948160-e300c5ec-c597-4808-8532-084b887fea53';
    return frisby.fetch('https://api.getpostman.com/collections/' + uid, {
      method: 'get',
        headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'x-api-key': SECRET_API_KEY,
        }, 
    })
    .expect('status', 200)
    .then((result) => {
      console.log(result.json.collection.info.name);
    })
  });

  it('API env status 401 without auth', () => {
    return frisby.get('https://api.getpostman.com/environments/')
    .expect('status', 401)
    .then((result) => {
      console.log(result.json);
    })
  });

  it('API env status 200 with auth', () => {
    return frisby.fetch('https://api.getpostman.com/environments/', {
      method: 'get',
        headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'x-api-key': SECRET_API_KEY,
        }, 
    })
    .expect('status', 200)
    .then((result) => {
      console.log(result.json);
    })
  });

  it('Get single environment by environment id of postman 30 days challenge workspace', () => {
    const env_id = '19948160-cfdfea4f-02b1-4971-a7fe-e76306453c60';
    return frisby.fetch('https://api.getpostman.com/environments/' + env_id, {
      method: 'get',
        headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'x-api-key': SECRET_API_KEY,
        }, 
    })
    .expect('status', 200)
    .then((result) => {
      console.log(result.json.environment.name);
    })
  });

  it('API ws status 401 without auth', () => {
    return frisby.get('https://api.getpostman.com/workspaces/')
    .expect('status', 401)
    .then((result) => {
      console.log(result.json);
    })
  });

  it('API ws status 200 with auth', () => {
    return frisby.fetch('https://api.getpostman.com/workspaces/', {
      method: 'get',
        headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'x-api-key': SECRET_API_KEY,
        }, 
    })
    .expect('status', 200)
    .then((result) => {
      console.log(result.json);
    })
  });

  it('Get single workspace by workspace id of postman 30 days challenge workspace', () => {
    const ws_id = 'd04a8c0b-9771-4c8c-a91f-f26219aa1bad';
    return frisby.fetch('https://api.getpostman.com/workspaces/' + ws_id, {
      method: 'get',
        headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'x-api-key': SECRET_API_KEY,
        }, 
    })
    .expect('status', 200)
    .then((result) => {
      console.log(result.json.workspace.name);
    })
  });

});

//prevent console from closure
require('readline')
.createInterface(process.stdin, process.stdout)
.question("Press [Enter] to exit...", function () {
  process.exit();
});