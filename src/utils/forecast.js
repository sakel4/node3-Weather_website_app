const request = require('request')

const forecast = ({latitude,longitude},callback) => {

    //with a units part at the end ('+'&units=f')we define the type of units we want for temperature like f ore without for celcious
    const url = 'http://api.weatherstack.com/current?access_key=bd5a6f28cd8f838870dd5ed2841f1af5&query='+latitude+','+longitude

    request({url: url, json: true}, (error,response) => {
        if(error){
            //console.log('Unable to get the data. Weather service does not respond')
            callback('Unable to get the data. Weather service does not respond',undefined)           
        }else if(response.body.error){
            // console.log('Unable to find location')
            callback('Unable to find location',undefined)
        }else{
            const data = {
                location: response.body.location.name,
                description: response.body.current.weather_descriptions,
                temperature: response.body.current.temperature,
                humidity: response.body.current.humidity,
                feeling: response.body.current.feelslike
            }
            // console.log('\n'+response.body.current.weather_descriptions+'\nAt ' + response.body.location.name + 'the temperature is ' + response.body.current.temperature + 'C. And haves '
            // + response.body.current.precip +'% perception to rain\n' +'And feels like ' + response.body.current.feelslike + 'C.')
            callback(undefined,data)
        }
    })

}

module.exports = forecast