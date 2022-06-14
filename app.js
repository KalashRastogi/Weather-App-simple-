const express = require("express");
const https = require("https")
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.get("/", function(req, res) {
    
    res.sendFile(__dirname+'/index.html');

});

app.post("/", function(req, res){
    // city = req.body.cityName;
    console.log(`request for ${req.body.cityName}'s weather recieved!`);
    const apiKey = 'a06fcb857bd39be303422b709873979d'
    const city=req.body.cityName
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    
    https.get(url, function(response){
        console.log(response.statusCode);
    
        response.on("data", function(data) {
            const weatherData = JSON.parse(data)
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            res.write(`<p>The weather is currently ${weatherDescription}</p>`)
            res.write( `<h1>The temprature in ${city} is ${temp} degrees.</h1>`)
            res.write(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png" />`)
            res.send()
        })
    })
})

app.listen(3000, function() {
    console.log("server running on port 3000")
})

//a06fcb857bd39be303422b709873979d
