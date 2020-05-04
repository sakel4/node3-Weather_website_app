const request = require('request')

const geoCode = (address,callback) => {
    //we use encodeURIComponent because if in some special we add character like '?' may have a problem and we want to avoid that
    //and we use this function to convert it into a suitable charactel for url
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoic2FrZWw0IiwiYSI6ImNrOTFidDhvbjAybGgzZm53czR6ODI4MHYifQ.F7etC-6Y2Ybk8v-T6Z7fbw&limit=1'

    request({url, json: true}, (error,response) => {
        if(error){
            //console.log('Unable to get the data. Location service does not respond')
            callback('Unable to get the data. Location service does not respond',undefined)
        }else if(response.body.features.length === 0){
            //console.log('Unable to find location')
            callback('Unable to find location. Try to search again',undefined)
        }else{
            data = {
                location: response.body.features[0].place_name,
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0]
            }
            callback(undefined,data)
        }
    })
}

module.exports = geoCode  