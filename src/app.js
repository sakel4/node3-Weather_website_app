//#region Require
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast.js')
//#endregion

//generate express app
const app = express()

//#region Paths
//define paths
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials'); 
//#endregion

//#region Handlers
//setup handlebars
app.set('view engine','hbs')
    //we use this to change tthe path that checks the hbs module(views location)
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//#endregion

//with tis command you can call the page with the filname like localhost:3000/help.html for help.html without
//manually all the pages
app.use(express.static(publicDirectoryPath))

//#region Example
//set what to do when someone hit the specific url
// app.get('/help',(req,res)=>{
//     res.send('<h1>Help page</h1>')
// })
//#endregion

//#region Set url directories with and without hbs(app.get)
app.get('/weather',(req,res)=>{//get forecast data based on address(like wether app)
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geoCode(req.query.address,(error,data = {})=>{
        console.log(data)
        if(error){//error check
            return res.send({
                error: 'Error: '+ error
            })
        }else{ //if find the area latitude and longitude search the area forecast 
                forecast(data,(forecastError,forecastData = {}) =>{
                    if(error){//error check
                        return res.send({
                            error: 'Error: '+forecastError
                        })
                    }else{//display the data
                        res.send({
                            address: req.query.address,
                            location: data.location,
                            latitude: data.latitude,
                            longitude: data.longitude,
                            description: forecastData.address,
                            temperature: forecastData.temperature,
                            preception: forecastData.preception,
                            feeling: forecastData.feeling
                        })
                    }
                })
        }
    })
    
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

//setup url directoriees with hbs
app.get('',(req,res)=>{
    //no need for extension must match the name
    //second argument passing data into the page
    res.render('index',{
        title: 'Weather',
        name: ' Sakellaris'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Page',
        name: ' Sakellaris'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        paragraph: ' Contact at example@email.com',
        name: ' Sakellaris'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        errormessage: 'Help article page not found',
        name: ' Sakellaris'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        errormessage: 'Page not found',
        name: ' Sakellaris'
    
    })
})
//#endregion

app.listen(3000,()=>{
    console.log('Server is up on port 3000. Visit http://localhost:3000')
})