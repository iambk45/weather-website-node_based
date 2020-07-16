const request = require('request')


const forecast = (latitude,longitude,callback) => {
    const url = "http://api.weatherstack.com/current?access_key=2e46f3fde64acda2672be2a7d9d50896&query="+latitude+","+longitude
    request({url,json:true},(error, {body}) => {
        if(error){
            callback("Unable to connect to weather service!",undefined)
        }else if(body.error){
            callback("Unable to find location!",undefined)
        }else
        {
            callback(undefined,"It is currently "+body.current.temperature+" degree and has "+body.current.precip+" % to rain")
        }
    })
}

module.exports = forecast