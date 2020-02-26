const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");

const  apiKey = '7c71771dd6ca97d81fc4c61e23201595';  
// apikey is unique key and get it from openweathermap.com

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine','ejs');  // to use files in views(html || ejs)
app.use(express.static('public'));  //to use css 


// routing 
 // get was just to just text front end
app.get("/",(req,res)=>{
	res.render('index',{weather:null,error:null});
});



app.post('/',(req,res)=>{

	let city = req.body.city;
	let units = 'metric';
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;  

	// NOTE-> {main.temp Temperature.} =>  Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
	// here to get result in *C , i used units as metric

request(url,(err,response,body)=>{
	if(err){
		console.log("err : ",err);
		res.render('index',{weather : null ,error: 'Error , please try again'});
	} else {

		let weather = JSON.parse(body);
		if(weather.main == undefined){
			console.log("weather undefined");
			res.render('index',{weather : null,error: 'Error, please try again'});
		} else {
			let x= weather.main.temp;
			//let y = ((x-273.15)*9)/5 +32 ;  // (( kelvinValue - 273.15) * 9/5) + 32
			let weatherText = ` It's ${x} C in ${weather.name} !!! `;
			console.log(weatherText);
			res.render('index',{weather : weatherText ,error :null});
		}
	}
  });

});


//-------server code  ----------
const port = 1111 || process.env.PORT;
app.listen(port);
console.log("sever it is : ",port);

