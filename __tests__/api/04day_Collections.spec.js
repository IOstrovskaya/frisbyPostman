const frisby = require('frisby');
const Joi = frisby.Joi;
const {X_API_KEY} = require('../config/global_test-config')
describe('Postman APIs testing: Day 04', () => {
  it('API Status 200 response', () => {
    return frisby.fetch('https://api.getpostman.com/collections', {
        method: 'get',
        headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'x-api-key': X_API_KEY,
        },
      })
    .expect('status', 200);
  });
  
  it('Response contain collections', () => {
    return frisby.fetch('https://api.getpostman.com/collections', {
        method: 'get',
        headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'x-api-key': X_API_KEY,
        },
      })
    .expect('status', 200)
    .expect('jsonTypes', 'collections.*', {
      id: Joi.string(),
      name: Joi.string(),
      owner: Joi.number(),
      createdAt: Joi.string(),
      updatedAt: Joi.string(),
      uid: Joi.string(),
      isPublic: Joi.boolean(),
      fork: Joi.object(),
    });
  });

  it("Get specific collection info-block by collection name", () => {
    return frisby.fetch('https://api.getpostman.com/collections', {
        method: 'get',
        headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'x-api-key': X_API_KEY,
        },
      })
      .expect('status', 200)
      .expect((result) => {
        const body = result.json;
        const collection_info = body.collections.find(result => result.name === 'Day 30: Submit a pull request');
        console.log('collection id: ' + collection_info.id + '\n'
        + 'name: ' + collection_info.name + '\n' 
        + 'owner: ' + collection_info.owner +'\n'
        + 'createdAt: ' + collection_info.createrAt + '\n'
        + 'updatedAt: ' + collection_info.updatedAt + '\n'
        + 'uid: ' + collection_info.uid + '\n'
        + 'isPublic: ' + collection_info.isPublic + '\n'
        + 'fork: ' + '\n'
        + '   ' + 'label: ' + collection_info.fork.label + '\n'
        + '   ' + 'createdAt: ' + collection_info.fork.createdAt + '\n'
        + '   ' + 'from: ' + collection_info.fork.from + '\n')
        return expect(collection_info).not.toBeUndefined();
      });
  });
});

//prevent console from closure
require('readline')
.createInterface(process.stdin, process.stdout)
.question("Press [Enter] to exit...", function () {
  process.exit();
});