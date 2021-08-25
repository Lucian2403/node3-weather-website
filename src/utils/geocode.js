const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)  + '.json?access_token=pk.eyJ1IjoibHVjaWFuMjQwMyIsImEiOiJja3JnYmFsc2gyOW1nMnBxdWdqaXp3dWZtIn0.7wyb64bWUt-NlUmNLM7wQw&limit=1'

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services!', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find this location. Try another search!', undefined)
    } else {
      // the first param is undefined, because we know there will not be any errors
      callback(undefined, {
        latitude: body.features[0].geometry.coordinates[0],
        longitude: body.features[0].geometry.coordinates[1],
        location: body.features[0].place_name
      })
    }
  })
} 

module.exports = geocode