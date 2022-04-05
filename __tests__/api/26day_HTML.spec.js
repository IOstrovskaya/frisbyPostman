const { randomFill } = require('crypto');
const frisby = require('frisby');
var randomWords = require('random-words');
const Joi = frisby.Joi;
const cheerio = require('cheerio');

describe('Postman APIs testing: Day 26', () => {

  it('API HTML Parse get links', () => {
    const search_request = 'postman';
    return frisby.get('https://www.google.com/search' + '?' + 'q=' + search_request)
    .expect('status', 200)
    .then((response) => {
      const body = response.body;
      const $ = cheerio.load(body);
      const links = [];
      $('a').each((i,el) => {
        console.log(el);
        links.push($(el).attr('href'));
      })
      console.log(links);
    });
  });

});

//prevent console from closure
require('readline')
.createInterface(process.stdin, process.stdout)
.question("Press [Enter] to exit...", function () {
  process.exit();
});