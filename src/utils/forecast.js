const request = require('request')



const forecast = (long, lat, callback) => {
    const url = 'https://api.darksky.net/forecast/4bd6f6f76cd13d53c85e0d7a84af8f3d/'+ encodeURIComponent(long) +',%20' + encodeURIComponent(lat)  
    //'https://api.darksky.net/forecast/4bd6f6f76cd13d53c85e0d7a84af8f3d/37.8267,%20-122.4233'                                                           
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error){
            callback('Unable to find location!')
        }
        else {
            //console.log(body.daily.data[0])
            callback(undefined , body.daily.data[0].summary +` It is currently ${body.currently.temperature} degrees out. The high today is ${(body.daily.data[0].temperatureHigh)} with a low of ${(body.daily.data[0].temperatureHigh)}. There is a ${(body.currently.precipProbability)*100}% chance of rain. The `)
        }
    })
}


module.exports = forecast
// in request({url, json: true}, (error, response)
// replace const {body} = response therefore replacing response arg