const frisby = require('frisby');

const url = 'https://docs.jsonata.org/string-functions';

describe('Postman APIs testing: Day 28', () => {
  //jest.setTimeout(50000);
  it('Page Jsonana Status 200 response', () => {
    return frisby.get(url)
    .expect('status', 200)
    .expect('responseTime','500'); //to be not longer than 500
  });

  it('Lighthouse Status 200 response', () => {
    return frisby.get('https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=' + url)
    .expect('status', 200)
    .expect('responseTime','500');
  });
  
});

//prevent console from closure
require('readline')
.createInterface(process.stdin, process.stdout)
.question("Press [Enter] to exit...", function () {
  process.exit();
});