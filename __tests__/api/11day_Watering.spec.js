const frisby = require('frisby');

describe('Postman APIs testing: Day 11', () => {

  it('Page Status 200 response', () => {
    return frisby.get('https://water-ttl.herokuapp.com/hygrometer')
    .expect('status', 200);
  });

  it('Watering condition', () => {
    return frisby.get('https://water-ttl.herokuapp.com/hygrometer')
    .expect('status', 200)
    .then((result) => {
      console.log('Check moisture level: ' + result.json.level);
      if (result.json.level < 67) {
        return frisby.post('https://water-ttl.herokuapp.com/water', {
        duration: 10
        })
        .then(() => {
          console.log('Soil was watered.')
          return frisby.get('https://water-ttl.herokuapp.com/hygrometer')
          .expect('status', 200)
          .then((result) => {
            console.log('Current moisture level: ' + result.json.level);
          })
        })
      } else {
        console.log('Moisture level is enough!');
      }
    });
  });
  
});

//prevent console from closure
require('readline')
.createInterface(process.stdin, process.stdout)
.question("Press [Enter] to exit...", function () {
  process.exit();
});