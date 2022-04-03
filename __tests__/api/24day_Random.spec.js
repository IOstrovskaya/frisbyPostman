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

});

//prevent console from closure
require('readline')
.createInterface(process.stdin, process.stdout)
.question("Press [Enter] to exit...", function () {
  process.exit();
});