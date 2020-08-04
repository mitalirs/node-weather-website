const request = require ('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWl0YWxpc29uYXdhbmUiLCJhIjoiY2tjbTF4cTdyMW05bTJwbzNweW5yc3JjaCJ9.hi7s_J6qYnVC1jaebiVjpw&limit=1'
    //encodeURIComponent(address) to ensure that the program does not crash even if a certain user enters special characters e.g.: '?'

    request ({url, json:true}, (error, {body}) =>{
    if (error) {
        callback('Unable to connect to location services!', undefined)
    } else if (body.features.length === 0){
        callback('Unable to find the location. Try another search.')
    } else {
        callback(undefined, {
            long: body.features[0].center[0],
            lat: body.features[0].center[1],
            location: body.features[0].place_name
        })
    }
    })

}

module.exports = geocode
// in request({url, json: true}, (error, response)
// use const {body} = response therefore replacing response arg