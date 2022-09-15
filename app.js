const express= require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req,res){
res.sendFile(__dirname+ "/index.html");
});
app.post("/", function(req,res){

const query=req.body.cityName;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=c10f1d213dac7d5f621ae375a01ebf74";
https.get(url , function(response){
  console.log(response.statusCode);

  response.on("data",function(data){
  const weatherData=JSON.parse(data);
  const temp = weatherData.main.temp;
  const icon= weatherData.weather[0].icon;
  console.log(temp);
  const weatherDescription = weatherData.weather[0].description;
  console.log(weatherDescription);
  console.log(icon);
  const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"

  res.write("<h1>The temperature in "+ query +" is "+ temp + " F.</h1>");
  res.write("<p>The weather is currently " + weatherDescription+ ".</p>");
  res.write("<img src='"+imageURL+"'/>");
  res.send();
});

});
});/*
});*/







app.listen(3000, function(){
  console.log("Server is running on port 3000.")
})
