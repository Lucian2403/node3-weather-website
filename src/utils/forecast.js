const request = require('request')

// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=6bd4c6da043fc44aab6cf71b18d53ff4&query=' + longitude + ',' + latitude

  request({url, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location! Try another search!', undefined)
    } else {
      callback(undefined, 
        body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress, but it feels like ' +  body.current.feelslike + ' degrees outside. Precipitation level is ' + body.current.precip + '. The wind speed is ' + body.current.wind_speed + '.'
      )
    }
  })
}

module.exports = forecast