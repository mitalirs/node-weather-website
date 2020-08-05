const path = require('path') //is core node module, therefore built-in
const express = require('express')// npm library, so has to be installed first
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))
const app = express()
//for heroku
const port = process.env.PORT || 3000

// Define paths for express path
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// req == request : obj containing info abt incoming req to server
// res == response : handles request with a couple of methods

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//static takes in absolute path

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Mitali',
       
//     },{
//         name : 'Mitali2'
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Me'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Me'
    })
})

app.get('/help' , (req, res) => {
    res.render('help', {
        helpText:'This is some helpful text',
        title: 'Help',
        name: 'Me'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }
    else{
       geocode(req.query.address,(error, {long, lat, location } = {}) => {
           if(error) {
               return res.send({error})
           }
           // // every callback function takes 2 arguments when one works other is undefined, useful for setting conditions
           // if(error) {
           //     return(console.log(error))
           // } //we want to print error + not run forecast code below
           //   // 2 options return above error(and end func right there) or use else
           
           // //console.log('Error: ', error)
           // //console.log('Data: ', data) not needed  
       
           forecast(long, lat , (error, forecastData) => {
               if (error) {
                   return res.send(error)    
               } 
       
               res.send({
                   forecast: forecastData,
                   location,
                   address: req.query.address
               })
       
               //console.log('Error: ', error)
               //console.log('Data: ', data)
           })
       
       })
    }

    // if(!req.query.address){
    //     return res.send({
    //         error:'You must provide an address!'
    //     })//return to make sure func ends else you might get error if else is not there and you used 2 res(sent 2 responses) 
    // }
    // else{
    //     return res.send({
    //         address: req.query.address
    //     })
    // }


    // res.send({
    //     location: 'Philadelphia',
    //     forecast: 'It is snowing'
    // })
})


//server accepts a single req and sends single response 'cannot set headers after they are sent to the client' means you are sensding 2 responses
app.get('/products' , (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Me'
    })
})


//* match anything that hasn't been matched before
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Me'
    })
})


app.listen(port, () => {
    console.log('Server is up on port' + port)
})