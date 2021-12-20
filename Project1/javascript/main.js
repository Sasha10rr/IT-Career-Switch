 
//Get Countries and append to list
$.ajax({
    type: "POST",
    url: './php/geoJsonNames.php',
    data: {
        "type": "check"
    },
    success: function(response) {
        for (var i = 0; i < response.data.length; i++) {
            $('#selectCountries').append($('<option>', {
                value: response.data[i].code,
                text: response.data[i].name,
            }));
        }
        $("#selectCountries").html($("#selectCountries option").sort(function(a, b) {
            return a.text === b.text ? 0 : a.text < b.text ? -1 : 1
        }))
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
    }
});

//Get User Location
var latitude = document.getElementById("latitude");
var longitude = document.getElementById("longitude");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
//Show Position
showPosition = position => {
    const lat = position.coords.latitude
    //latitude.innerHTML = position.coords.latitude;
    //longitude.innerHTML = position.coords.longitude;

    $.ajax({
        url: "./php/openCage.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        },

        success: function(result) {
            //Updating Select Menu (selecting the country where the user is)              
            $("selectCountries select").val(result.data[0].components["ISO_3166-1_alpha-2"]);
            let currentCountry = result.data[0].components["ISO_3166-1_alpha-2"];
            $("#selectCountries").val(currentCountry).change();
            // Updating Country Data      
            $("#country").text(result.data[0].components["country"]);
            $("#city").text(result.data[0].components["city"]);
            $("#continent").text(result.data[0].components["continent"]);
          

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

function showError(error) {
    alert("Please Select Country")
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

getLocation();
var icon
var border;
var dotsMarkers;
var markers = L.markerClusterGroup()
// Selecting Contry and adding borders
$('#selectCountries').on('change', function() {

    let countryCode = $('#selectCountries').val();
    let countryOptionText = $('#selectCountries').find('option:selected').text();
    $.ajax({
        url: "./php/geoJsonBorders.php",
        type: 'POST',
        dataType: 'json',
        beforeSend: function(){
            $("#loader").show();
        },
        complete: function(){
            $("#loader").hide();
        },
        data:{countryName: $('#selectCountries').find('option:selected').text()},
        success: function(result) {
            let countryId;
            console.log(result)
            for (let i = 0; i < result.data.length; i++) {
                if (countryCode === result.data[i].code) {
                    countryOptionData = result.data[i].borders;
                    countryId = i;
                }
            }
            if (map.hasLayer(border)) {
                map.removeLayer(border);
            }
            
            
            border = L.geoJSON(result.data[0].borders, {
                color: "#" + Math.floor(Math.random() * 6234562).toString(16),
                weight: 3,
                opacity: 0.75
            }).addTo(map);
            

            let bounds = border.getBounds();
            map.fitBounds(bounds, {
                padding: [35, 35],
                duration: 2,


            });

            
            showPosition = position => {
                const lat = position.coords.latitude
                latitude.innerHTML = position.coords.latitude;
                longitude.innerHTML = position.coords.longitude;


            }



            //Restcountries
            var countryName = $('#selectCountries option:selected').text()
            $.ajax({
                url: "./php/restCountries.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    country: $('#selectCountries option:selected').val(),
                },
 
                success: function(result) {
                    var countryVal = result.data.currencies.map(c => c.code);
                    var city = result.data.capital;
                    $("#img1").attr("src",result.data.flag);
                    $("#countryName").text(result.data.name);
                    $("#city").text(result.data.capital);
                    $("#currency").text((result.data.currencies).map(c => c.name));
                    $("#population").text(numeral(result.data.population).format('0,0'));

                    $("#continent").text(result.data.continents);
                    $("#latitude").text(result.data.latlng[0]);
                    $("#longitude").text(result.data.latlng[1]);
                    $("#area").text(result.data.area);
                    $("#timezone").text(result.data.timezones);
                    $("#cityWeather").text(result.data.capital);
                    $("#countryWeather").text(result.data.name);
                   
                    $("#language").text((result.data.languages).map(c => c.name));
                    console.log(result.data.flag)
                     var flagIcon =L.icon({
                        iconUrl: result.data.flag,
                        iconSize: [25, 25], // size of the icon
                        shadowSize: [50, 64], // size of the shadow
                        iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
                        shadowAnchor: [4, 62], // the same for the shadow
                        popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
                    })
                    L.marker([result.data.latlng[0], result.data.latlng[1]], {
                        icon: flagIcon
                    }).addTo(map).bindPopup("Name: " + result.data.name + " Population: " + result.data.population + " Language: " + (result.data.languages).map(c => c.name));
 


                    //OpenExchangeRate
                    $.ajax({
                        url: "./php/openExchange.php",
                        type: 'GET',
                        dataType: 'json',
                        data: {
                        },
                        success: function(result) {       
                            $("#exchange").text(result.data.rates[countryVal]);                
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            console.log(textStatus, errorThrown);
                        }
                    });

                    //WIKIPLACES
                    
                    $.ajax({
                        url: "./php/wikipedia.php",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            countryName: countryName.replace(" ", "_"),
                        },
                        success: function(result) {
                            
                            $("#wiki").html(result.data.extract);
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            console.log(textStatus, errorThrown);
                        }
                    });

                    //OPENWEATHER
                    $.ajax({
                        url: './php/openWeather.php',
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            city: city,
                        },

                        success: function(result) {

                            console.log(result)
                            $("#weatherDate").text((Date.parse(result.data.list[0].dt_txt)).toString().slice(0, 15));
                            $("#weatherStatus").text(result.data.list[0].weather[0].main)
                            $("#mainWeather").text(Math.round(result.data.list[0].main.temp_max - 273)+"°");
                             
                            $("#day1").text((Date.parse(result.data.list[1].dt_txt)).toString().slice(0, 3));
                            $("#day2").text((Date.parse(result.data.list[9].dt_txt)).toString().slice(0, 3));
                            $("#day3").text((Date.parse(result.data.list[17].dt_txt)).toString().slice(0, 3));
                            $("#day4").text((Date.parse(result.data.list[25].dt_txt)).toString().slice(0, 3));
                            $("#day5").text((Date.parse(result.data.list[37].dt_txt)).toString().slice(0, 3));

                            $("#day1Tmax").text(Math.round(result.data.list[1].main.temp_max - 273)+"°");
                            $("#day1Tmin").text(Math.round(result.data.list[1].main.temp_min - 273)+"°");
                            $("#day2Tmax").text(Math.round(result.data.list[9].main.temp_max - 273)+"°");
                            $("#day2Tmin").text(Math.round(result.data.list[9].main.temp_min - 273)+"°");
                            $("#day3Tmax").text(Math.round(result.data.list[17].main.temp_max - 273)+"°");
                            $("#day3Tmin").text(Math.round(result.data.list[17].main.temp_min - 273)+"°");
                            $("#day4Tmax").text(Math.round(result.data.list[25].main.temp_max - 273)+"°");
                            $("#day4Tmin").text(Math.round(result.data.list[25].main.temp_min - 273)+"°");
                            $("#day5Tmax").text(Math.round(result.data.list[37].main.temp_max - 273)+"°");
                            $("#day5Tmin").text(Math.round(result.data.list[37].main.temp_min - 273)+"°");



                        
                           
                            
                      /*      var weatherIcon = L.icon({
                                iconUrl: "https://openweathermap.org/img/wn/" + result.data.list[0].weather[0].icon + ".png",
                                iconSize: [45, 45], // size of the icon
                                shadowSize: [50, 64], // size of the shadow
                                iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
                                shadowAnchor: [4, 62], // the same for the shadow
                                popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
                            });
                            L.marker([result.data.city.coord.lat, result.data.city.coord.lon], {
                                icon: weatherIcon
                            }).addTo(map).bindPopup(result.data.list[0].weather[0].main + " " + Math.round(result.data.list[0].main.temp_max - 273) + "°C"); */
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            console.log(textStatus, errorThrown);
                        }
                    });


                    $.ajax({
                        url: './php/airports.php',
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            
                        },
                    
                        success: function(result) {
                    
                            
                           
                          const geojsonMarkerOptions = {
                            radius: 8,
                            fillColor: "#ff7800",
                            color: "#000",
                            weight: 0.4,
                            opacity: 1,
                            fillOpacity: 0.8,
                          };
                          var redMarker = L.ExtraMarkers.icon({
                            icon: 'fa-plane',
                            markerColor: 'red',
                            shape: 'square',
                            prefix: 'fa'
                          });
                        
                          
                         
                         
                          function onEachFeature(feature, layer) {
                           
        
        
                            
                               if(countryCode===feature.properties.country_code){
                                   
                              if(feature.properties.website != undefined){
                                  var airportWebsite =feature.properties.website;
                              }
                              else
                              airportWebsite = "Website not found"
                               
                            
                          const popupContent =
                            '<h4 class = "text-primary">Airport</h4>' +
                            '<div class="container"><table class="table table-striped">' +
                            "<thead><tr><th>Properties</th><th>Value</th></tr></thead>" +
                            "<tbody><tr><td> Name </td><td>" +
                            feature.properties.name +
                            "</td></tr>" +
                            "<tr><td>Country </td><td>" +
                            feature.properties.country +
                            "</td></tr>" +
                            `<tr><td> Website (watt) </td><td> <a href= ${airportWebsite} target="_blank">` +
                            airportWebsite+
                            "</a></td></tr>";
                            
                                layer.bindPopup(popupContent);
                                
                            
                            }
                        }

                     
                     
                        
                        if(map.hasLayer(markers)){
                             
                            markers.eachLayer(function (layer) {

                                markers.removeLayer(layer);
                            
                            });
                          
                         }
                        
                         
                          dotsMarkers= L.geoJSON(result.airports.features, {
                            onEachFeature:onEachFeature,
                            pointToLayer: function (feature, latlng) {
                                if(countryCode===feature.properties.country_code)
                                return (L.marker(latlng, {icon: redMarker}));
                                
                              }   
                          })
                          markers.addLayer(dotsMarkers).addTo(map);
     
                         
                         
                    },
                        error: function(jqXHR, textStatus, errorThrown) {
                            console.log(textStatus, errorThrown);
                        }
                    });




                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });


         


        },

        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
            console.log(textStatus, errorThrown);
        }
    });
});

 // AIRPORTS





var map = L.map('map').setView([41.9985, 21.4313], 3);

L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=YYGY5XbRNrBk7Nyt0HEM', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(map);  


var unitIsCelcius = true;
var globalForecast = [];

// Maps the API's icons to the ones from https://erikflowers.github.io/weather-icons/
var weatherIconsMap = {
  "01d": "wi-day-sunny",
  "01n": "wi-night-clear",
  "02d": "wi-day-cloudy",
  "02n": "wi-night-cloudy",
  "03d": "wi-cloud",
  "03n": "wi-cloud",
  "04d": "wi-cloudy",
  "04n": "wi-cloudy",
  "09d": "wi-showers",
  "09n": "wi-showers",
  "10d": "wi-day-hail",
  "10n": "wi-night-hail",
  "11d": "wi-thunderstorm",
  "11n": "wi-thunderstorm",
  "13d": "wi-snow",
  "13n": "wi-snow",
  "50d": "wi-fog",
  "50n": "wi-fog"
};


$(function(){
  getClientPosition();
  startClock();  
});


function startClock(){
  setInterval(function(){
    $("#localTime").text(new Date().toLocaleTimeString());
  }, 1000);
}


function getClientPosition(){
  $.getJSON("https://ipapi.co/json/", function(position) {
    $("#cityName").text(position.city);
    $("#cityCode").text(position.country);
    
    getWeatherData(position.latitude, position.longitude);
  });
}


function getWeatherData(latitude, longitude){
  $.ajax({
    type: "GET",
    url: "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast/daily?APPID=9b4bbf30228eb8528d36e79d05da1fac&lat=" + latitude + "&lon=" + longitude + "&units=metric&cnt=5",
    cache: true,
    headers: {
      "Access-Control-Allow-Headers": "x-requested-with"
    },
    success: function(forecast){
      globalForecast = forecast;
      updateForecast(forecast);

      // Stops Refresh button's spinning animation
      $("#refreshButton").html("<i class='fa fa-refresh fa-fw'></i> Refresh");
    },
    error: function(error){
      console.log("Error with ajax: "+ error);
    }
  });
}

 
 
var weatherCheck = false;
var infoCheck = false;

// Weather buttons
L.easyButton( '<span class="star">&#9729;</span>', function(){
    if(!weatherCheck){
        $(".overlayWeather").css("visibility","visible");
         
        weatherCheck = true;
    }
    else{
        $(".overlayWeather").css("visibility","hidden");
         
        weatherCheck = false;
    }
    
  }).addTo(map);

  $( "#weatherButton" ).click(function() {
    if(!weatherCheck){
        $(".overlayWeather").css("visibility","visible");
         
        weatherCheck = true;
    }
    else{
        $(".overlayWeather").css("visibility","hidden");
         
        weatherCheck = false;
    }
  });






  L.easyButton( '<span class="sun">&#x2139;</span>', function(){
    if(!infoCheck){
        $(".overlayInfo").css("visibility","visible");
         
        infoCheck = true;
    }
    else{
        $(".overlayInfo").css("visibility","hidden");
         
        infoCheck = false;
    }
    
  }).addTo(map);

  $( "#infoClose" ).click(function() {
    if(!infoCheck){
        $(".overlayInfo").css("visibility","visible");
         
        infoCheck = true;
    }
    else{
        $(".overlayInfo").css("visibility","hidden");
         
        infoCheck = false;
    }
  });


const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const d = new Date();
let day = weekday[d.getDay()];
document.getElementById("day").innerHTML = day;

(document).ready(function(){ setTimeout(function(){ $('.container').fadeOut(); },1000); });