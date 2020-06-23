const express=require("express");
const bodyPareser=require("body-parser");
const app=express();
const https=require("https");
app.use(bodyPareser.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})


app.post("/",function(req,res){
const query=req.body.search;
console.log(query);
const appid="27d734458a1e4b5dff589c7d5a275f6a";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units=metric";
https.get(url,function(response){
  console.log(response.statusCode);

  response.on("data",function(data){
    const weatherData=JSON.parse(data);
    const temp=weatherData.main.temp;
    console.log(temp);
    res.render('lists',{query: query,temp: temp})
  })
})
})




app.listen(process.env.PORT||3000,function(){
  console.log("server is running on port 3000");
})
