

var lat = 0;
var lon = 0;

var x = document.getElementById("message");
var y = document.getElementById("message2");
var z = document.getElementById("message3");


var fahrh = 0;
var celsius = 0;
var kelvin = 0;
var f2 = 0;
var id = 0;



function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  
  
  var apicall = "http://api.openweathermap.org/data/2.5/weather?lat=";
  apicall = apicall + lat + "&lon=" + lon + "&appid=902a9305f2a13afbddde2e12f75ccd8c";
  
 
  $.getJSON(apicall, function(json) {
    
    // Weather Description
    x.innerHTML = JSON.stringify(json.weather[0].description);
    x.innerHTML = x.innerHTML.replace(/"/g,"")
    
    // Temperature
    kelvin = JSON.stringify(json.main.temp);
    celsius = kelvin - 273.15;
    fahrh = kelvin * 1.8 - 459.67;
    celsius = (parseInt(celsius,10));
    fahrh = (parseInt(fahrh,10));
    y.innerHTML = celsius + "°";
    document.getElementById("temp").style.visibility = "visible";
    
    // Location
    z.innerHTML = JSON.stringify(json.name);
    z.innerHTML = z.innerHTML.replace(/\W/g,"")
    
    // ID, used for the icons
    id = JSON.stringify(json.weather[0].id);
    //alert(id);
    document.getElementById("icon").style.visibility = "visible";
   
    //choose the icon according to the weather-ID
   if (id <300 && id >199) {
     document.getElementById("picture").src = "http://openweathermap.org/img/w/11d.png";
   } else if (id <400 && id >200) {
     document.getElementById("picture").src = "http://openweathermap.org/img/w/09d.png";
   } else if (id <511 && id >400) {
     document.getElementById("picture").src = "http://openweathermap.org/img/w/10d.png";
   } else if (id <600 && id >511) {
     document.getElementById("picture").src = "http://openweathermap.org/img/w/09d.png";
   } else if (id === 511) {
     document.getElementById("picture").src = "http://openweathermap.org/img/w/09d.png";
   } else if (id <700 && id >599) {
     document.getElementById("picture").src = "http://openweathermap.org/img/w/13d.png";
   } else if (id <800 && id >699) {
     document.getElementById("picture").src = "http://openweathermap.org/img/w/50d.png";
   } else if (id === 800) {
     document.getElementById("picture").src = "http://openweathermap.org/img/w/01n.png";
   } else if (id <900 && id >800) {
     document.getElementById("picture").src = "http://openweathermap.org/img/w/02d.png";
   } 
    
    
    
    
});
  
}

document.getElementById("temp").addEventListener("click", function() {

  if(temp.innerHTML === "F") {
  
  f2 = parseInt(fahrh);
  y.innerHTML = f2 + "F";
  temp.innerHTML = "C";
  } else {
    y.innerHTML = celsius + "°";
  temp.innerHTML = "F";
  }
  
  
  
});