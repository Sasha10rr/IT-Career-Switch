//Get Countries 
$.ajax({
    type: "POST",
    url: './php/geoJson.php',
    data: {
        "type": "check"
    },
    success: function(response) {
        console.log(response);

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

            console.log('openCage PHP', result);

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

            console.log('all borders result', result);
            let countryId;
            for (let i = 0; i < result.data.length; i++) {
                if (countryCode === result.data[i].code) {
                    countryOptionData = result.data[i].borders;
                    countryId = i;
                }

            }

            console.log(countryOptionData)


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
            var countryName = $('#selectCountries option:selected').text();

            $.ajax({
                url: `https://restcountries.com/v2/name/${countryName}`,
                type: 'GET',
                dataType: 'json',
                data: {

                },

                success: function(result) {

                    var countryVal = result[0].currencies.map(c => c.code);
                    var city = result[0].capital;

                    console.log('restcountries PHP', result);
                    $("#country").text(result[0].name);
                    $("#city").text(result[0].capital);
                    $("#continent").text(result[0].continents);
                    $("#latitude").text(result[0].latlng[0]);
                    $("#longitude").text(result[0].latlng[1]);
                    $("#area").text(result[0].area);
                    $("#timezone").text(result[0].timezones);
                    $("#population").text(result[0].population);
                    $("#currencies").text((result[0].currencies).map(c => c.name));
                    $("#languages").text((result[0].languages).map(c => c.name));



                    var Flag = L.icon({
                        iconUrl: result[0].flag,


                        iconSize: [25, 25], // size of the icon
                        shadowSize: [50, 64], // size of the shadow
                        iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
                        shadowAnchor: [4, 62], // the same for the shadow
                        popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
                    });

                    L.marker([result[0].latlng[0], result[0].latlng[1]], {
                        icon: Flag
                    }).addTo(map).bindPopup("Name: " + result[0].name + " Population: " + result[0].population + " Language: " + (result[0].languages).map(c => c.name));



                    //OpenExchangeRate
                    $.ajax({
                        url: `https://openexchangerates.org/api/latest.json?app_id=c68e90cae6214744ab106e4d6ffd3095`,
                        type: 'GET',
                        dataType: 'json',
                        data: {

                        },

                        success: function(result) {

                            $("#exchange").text(result.rates[countryVal]);


                            console.log(countryVal)

                            console.log("exchange ", result.rates[countryVal])
                            console.log(countryVal)
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            console.log(textStatus, errorThrown);
                        }
                    });
                    //WIKIPLACES
                    $.ajax({
                        url: 'https://en.wikipedia.org/api/rest_v1/page/summary/' + countryName,
                        type: 'GET',
                        dataType: 'json',
                        data: {

                        },

                        success: function(result) {


                            console.log("wiki ", result)
                            $("#wiki").html(result.extract_html);



                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            console.log(textStatus, errorThrown);
                        }


                    });
                    //OPENWEATHER
                    $.ajax({
                        url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=1ed05f7083a455d1d8456db2bb406c6f',
                        type: 'GET',
                        dataType: 'json',
                        data: {

                        },

                        success: function(result) {





                            console.log("weather ", result)
                            $("#temp").text(Math.round(result.list[0].main.temp - 273));

                            $("#ftemp").text(Math.round(result.list[0].main.feels_like - 273));
                            $("#hum").text(result.list[0].main.humidity);
                            $("#pressure").text(result.list[0].main.pressure);
                            $("#maxtemp").text(Math.round(result.list[0].main.temp_max - 273));
                            $("#mintemp").text(Math.round(result.list[0].main.temp_min - 273));

                            //FORECAST
                            console.log(new Date(result.list[0].dt))
                            $("#day1").text(new Date(result.list[0].dt * 1000 - (result.city.timezone * 1000)))
                            $("#day2").text(new Date(result.list[5].dt * 1000 - (result.city.timezone * 1000)))
                            $("#day3").text(new Date(result.list[11].dt * 1000 - (result.city.timezone * 1000)))
                            //Today
                            $("#tMain").text(result.list[0].weather[0].main);
                            $("#tMax").text(Math.round(result.list[0].main.temp_max - 273));
                            $("#tMin").text(Math.round(result.list[0].main.temp_min - 273));
                            //Tomorrow
                            $("#tmMain").text(result.list[5].weather[0].main);
                            $("#tmMax").text(Math.round(result.list[5].main.temp_max - 273));
                            $("#tmMin").text(Math.round(result.list[5].main.temp_min - 273));
                            //Day After Tomorrow
                            $("#aMain").text(result.list[11].weather[0].main);
                            $("#aMax").text(Math.round(result.list[11].main.temp_max - 273));
                            $("#aMin").text(Math.round(result.list[11].main.temp_min - 273));
                            console.log(result.list[0].weather[0].main)
                            var weather = L.icon({
                                iconUrl: "https://openweathermap.org/img/wn/" + result.list[0].weather[0].icon + ".png",


                                iconSize: [45, 45], // size of the icon
                                shadowSize: [50, 64], // size of the shadow
                                iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
                                shadowAnchor: [4, 62], // the same for the shadow
                                popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
                            });

                            L.marker([result.city.coord.lat, result.city.coord.lon], {
                                icon: weather
                            }).addTo(map).bindPopup(result.list[0].weather[0].main + " " + Math.round(result.list[0].main.temp_max - 273) + "°C");


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





var map = L.map('map').setView([41.9985, 21.4313], 13);
var marker = L.marker([51.5, -0.09]).addTo(map);


L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=YYGY5XbRNrBk7Nyt0HEM', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(map);