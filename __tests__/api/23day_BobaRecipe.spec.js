const frisby = require('frisby');
const Joi = frisby.Joi;
const fs = require('fs');


describe('Postman APIs testing: Day 23', () => {

  it('API status 200', () => {
    const Region = ['Hawaii', 'California'];
    const boba = ['100', '96'];
    const i = 1;
    return frisby.get('https://postman-echo.com/get' +'?' + Region[i] + '=' + boba[i])
    .expect('status', 200)
    .expect((result) => {
      console.log(result.json)
    });
  });

  jest.setTimeout(100000);
  it('Check for boba in Region with data file upload', async() => {
    const fileData = fs.readFileSync('D:/Documents/Git/frisbyPostman/__tests__/test_files_data/geoMap.csv', 'utf8');
    const rows = fileData.split('\n');
    console.log(rows);
    for (let index = 1; index < rows.length; index++) {
      const values = rows[index].split(',');
      const region = values[0];
      const boba=values[1];
      const result = await frisby.get('https://postman-echo.com/get?' + region + '=' + boba);
      console.log(result.json);
      if(result.json.args[region] === '62') {
        console.log('Region with 62% boba popularity is fould');
        return;
      }  
    }
  });

});

//prevent console from closure
require('readline')
.createInterface(process.stdin, process.stdout)
.question("Press [Enter] to exit...", function () {
  process.exit();
});