const { randomFill } = require('crypto');
const frisby = require('frisby');
var randomWords = require('random-words');
const Joi = frisby.Joi;

describe('Postman APIs testing: Day 24', () => {

  it('Search by random word check 200 response', () => {
    var word = randomWords();
    return frisby.get('https://api.chucknorris.io/jokes/search?query=' + word)
    .expect('status', 200)
    .expect((result) => {
      console.log('Search by random word: ' + word);
      console.log(result.json)
    });
  });

  it('Moments in time 200 response', () => {
    return frisby.get('http://worldtimeapi.org/api/ip')
    .expect('status', 200)
    .expect((result) => {
      console.log(result.json)
    });
  });

  it('Moments in time correct data types', () => {
    return frisby.get('http://worldtimeapi.org/api/ip')
    .expect('status', 200)
    .expect('jsonTypes','abbreviation', Joi.string())
    .expect('jsonTypes','client_ip', Joi.string())
    .expect('jsonTypes','datetime', Joi.string())
    .expect('jsonTypes','day_of_week', Joi.number())
    .expect('jsonTypes','day_of_year', Joi.number())
    .expect('jsonTypes','dst', Joi.boolean())
    .expect('jsonTypes','dst_from', [
      null,
      Joi.number(),
    ])
    .expect('jsonTypes','dst_offset', Joi.number())
    .expect('jsonTypes','dst_until', [
      null,
      Joi.number(),
    ])
    .expect('jsonTypes','raw_offset', Joi.number())
    .expect('jsonTypes','timezone', Joi.string())
    .expect('jsonTypes','unixtime', Joi.number())
    .expect('jsonTypes','utc_datetime', Joi.string())
    .expect('jsonTypes','utc_offset', Joi.string())
    .expect('jsonTypes','week_number', Joi.number())
  });

});

//prevent console from closure
require('readline')
.createInterface(process.stdin, process.stdout)
.question("Press [Enter] to exit...", function () {
  process.exit();
});