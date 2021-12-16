

//Get Countries and append to list
$.ajax({
    type: "POST",
    url: './php/geoJson.php',
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
    latitude.innerHTML = position.coords.latitude;
    longitude.innerHTML = position.coords.longitude;

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

// Selecting Contry and adding borders
$('#selectCountries').on('change', function() {

    let countryCode = $('#selectCountries').val();
    let countryOptionText = $('#selectCountries').find('option:selected').text();
    $.ajax({
        url: "./php/geoJson.php",
        type: 'POST',
        dataType: 'json',
        success: function(result) {
            let countryId;
            for (let i = 0; i < result.data.length; i++) {
                if (countryCode === result.data[i].code) {
                    countryOptionData = result.data[i].borders;
                    countryId = i;
                }
            }
            border = L.geoJSON(countryOptionData, {
                color: "#" + Math.floor(Math.random() * 6234562).toString(16),
                weight: 3,
                opacity: 0.75
            }).addTo(map);

            let bounds = border.getBounds();
            map.flyToBounds(bounds, {
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
                    $("#country").text(result.data.name);
                    $("#city").text(result.data.capital);
                    $("#continent").text(result.data.continents);
                    $("#latitude").text(result.data.latlng[0]);
                    $("#longitude").text(result.data.latlng[1]);
                    $("#area").text(result.data.area);
                    $("#timezone").text(result.data.timezones);
                    $("#population").text(result.data.population);
                    $("#currencies").text((result.data.currencies).map(c => c.name));
                    $("#languages").text((result.data.languages).map(c => c.name));

                    var flagIcon = L.icon({
                        iconUrl: result.data.flag,
                        iconSize: [25, 25], // size of the icon
                        shadowSize: [50, 64], // size of the shadow
                        iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
                        shadowAnchor: [4, 62], // the same for the shadow
                        popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
                    });

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
                            //WEATHER
                            $("#temp").text(Math.round(result.data.list[0].main.temp - 273));
                            $("#ftemp").text(Math.round(result.data.list[0].main.feels_like - 273));
                            $("#hum").text(result.data.list[0].main.humidity);
                            $("#pressure").text(result.data.list[0].main.pressure);
                            $("#maxtemp").text(Math.round(result.data.list[0].main.temp_max - 273));
                            $("#mintemp").text(Math.round(result.data.list[0].main.temp_min - 273));
                            
                            //FORECAST
                            $("#day1").text(new Date(result.data.list[0].dt * 1000 - (result.data.city.timezone * 1000)))
                            $("#day2").text(new Date(result.data.list[5].dt * 1000 - (result.data.city.timezone * 1000)))
                            $("#day3").text(new Date(result.data.list[11].dt * 1000 - (result.data.city.timezone * 1000)))
                           
                            //Today
                            $("#tMain").text(result.data.list[0].weather[0].main);
                            $("#tMax").text(Math.round(result.data.list[0].main.temp_max - 273));
                            $("#tMin").text(Math.round(result.data.list[0].main.temp_min - 273));
                           
                            //Tomorrow
                            $("#tmMain").text(result.data.list[5].weather[0].main);
                            $("#tmMax").text(Math.round(result.data.list[5].main.temp_max - 273));
                            $("#tmMin").text(Math.round(result.data.list[5].main.temp_min - 273));
                           
                            //Day After Tomorrow
                            $("#aMain").text(result.data.list[11].weather[0].main);
                            $("#aMax").text(Math.round(result.data.list[11].main.temp_max - 273));
                            $("#aMin").text(Math.round(result.data.list[11].main.temp_min - 273));
                           
                            
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
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      };
      
     
     
      function onEachFeature(feature, layer) {
        
        
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
        "<tr><td> Website (watt) </td><td>" +
        feature.properties.website +
        "</td></tr>";
        
            layer.bindPopup(popupContent);
            
        
      
    }
      

     var dotsMarkers= L.geoJSON(result.airports.features, {
        onEachFeature:onEachFeature,
        pointToLayer: function (feature, latlng) {
            return (L.circleMarker(latlng, geojsonMarkerOptions));
            
          }   
      });
       
      var markers = L.markerClusterGroup();
      markers.addLayer(dotsMarkers);
      map.addLayer(markers);



},
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
    }
});




var map = L.map('map').setView([41.9985, 21.4313], 3);

L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=YYGY5XbRNrBk7Nyt0HEM', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(map);

