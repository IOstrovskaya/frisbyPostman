const frisby = require('frisby');
const {graphql} = require{"graphql"};

describe('Postman APIs testing: Day 19', () => {

  it('Get discography of music group/artist from Spotify', () => {
    return frisby.post('https://joyce-spotify-graphql.herokuapp.com/graphql', {
      operationName: 'getArtists',
      query: graphql
        query getArtists($name: String!) {
          queryArtists(byName: $name) {
            name
            image
            albums {
              name
            }
          }
        },
        variables: {
          name: 'Scorpions',
        }
    })
    .then((result) => {
      console.log(result.json);
    })
  });

});

//prevent console from closure
require('readline')
.createInterface(process.stdin, process.stdout)
.question("Press [Enter] to exit...", function () {
  process.exit();
});