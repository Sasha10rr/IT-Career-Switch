$('#api_astergdem_submit').click(function() {
    if ($('#astergdem_lat').val() == '' || $('#astergdem_lat').val() == null) {
        alert('Please Fill the latitude value');
    } else if ($('#astergdem_lng').val() == '' || $('#astergdem_lng').val() == null) {
        alert('Please Fill the logitude value');
    } else {
        $.ajax({
            url: "libs/php/getAstergdem.php",
            type: 'POST',
            dataType: 'json',
            data: {
                lat: $('#astergdem_lat').val(),
                lng: $('#astergdem_lng').val()
            },
            success: function(result) {
                console.log(JSON.stringify(result));

                if (result.status.name == "ok") {
                    $('#result').html("Astergdem: " + result.data.astergdem);
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
                // your error code
            }
        });
    }

});

$('#api_timezone_submit').click(function() {
    if ($('#timezone_lat').val() == '' || $('#timezone_lat').val() == null) {
        alert('Please Fill the latitude value');
    } else if ($('#timezone_lng').val() == '' || $('#timezone_lng').val() == null) {
        alert('Please Fill the logitude value');
    } else {
        $.ajax({
            url: "libs/php/getTimezone.php",
            type: 'POST',
            dataType: 'json',
            data: {
                lat: $('#timezone_lat').val(),
                lng: $('#timezone_lng').val()
            },
            success: function(result) {
                console.log(JSON.stringify(result));

                if (result.status.name == "ok") {

                    var res = '<table>';
                    res += '<tr><td colspan="2">TimeZone Result</td></tr><tr>';
                    res += '<td>Timezone Id:</td><td> ' + result.data.timezoneId + "</td>";
                    res += '</tr><tr>';
                    res += '<td>Country Code:</td><td> ' + result.data.countryCode + "</td>";
                    res += '</tr><tr>';
                    res += '<td>Country Name:</td><td> ' + result.data.countryName + "</td>";
                    res += '</tr><tr>';
                    res += '<td>Time:</td><td> ' + result.data.time + "</td>";
                    res += '</tr><tr>';
                    res += '<td>Sunrise:</td><td> ' + result.data.sunrise + "</td>";
                    res += '</tr><tr>';
                    res += '<td>Sunset:</td><td> ' + result.data.sunset + "</td>";
                    res += '</tr><tr>';
                    res += '<td>Latitude:</td><td> ' + result.data.lat + "</td>";
                    res += '</tr><tr>';
                    res += '<td>Longitute:</td><td> ' + result.data.lng + "</td>";
                    res += '</tr><tr>';
                    res += '<td>rawOffset:</td><td> ' + result.data.rawOffset + "</td>";
                    res += '</tr><tr>';
                    res += '<td>gmtOffset:</td><td> ' + result.data.gmtOffset + "</td>";
                    res += '</tr><tr>';
                    res += '<td>dstOffset:</td><td> ' + result.data.dstOffset + "</td>";
                    res += '</tr>';
                    res += '</table>';
                    $('#result').html(res);
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
                // your error code
            }
        });
    }

});


$('#api_Neighbourhood_submit').click(function() {
    if ($('#Neighbourhood_lat').val() == '' || $('#Neighbourhood_lat').val() == null) {
        alert('Please Fill the latitude value');
    } else if ($('#Neighbourhood_lng').val() == '' || $('#Neighbourhood_lng').val() == null) {
        alert('Please Fill the logitude value');
    } else {
        $.ajax({
            url: "libs/php/getNeighbourhood.php",
            type: 'POST',
            dataType: 'json',
            data: {
                lat: $('#Neighbourhood_lat').val(),
                lng: $('#Neighbourhood_lng').val()
            },
            success: function(result) {
                console.log(JSON.stringify(result));

                if (result.status.name == "ok") {
                    var res = '<table>';
                    res += '<tr><td colspan="2">Neighbourhood Result</td></tr><tr>';
                    res += '<td>name:</td><td> ' + result.data.name + "</td>";
                    res += '</tr><tr>';
                    res += '<td>Country Code:</td><td> ' + result.data.countryCode + "</td>";
                    res += '</tr><tr>';
                    res += '<td>Country Name:</td><td> ' + result.data.countryName + "</td>";
                    res += '</tr><tr>';
                    res += '<td>City:</td><td> ' + result.data.city + "</td>";
                    res += '</tr><tr>';
                    res += '<td>adminCode1:</td><td> ' + result.data.adminCode1 + "</td>";
                    res += '</tr><tr>';
                    res += '<td>adminName1:</td><td> ' + result.data.adminName1 + "</td>";
                    res += '</tr><tr>';
                    res += '<td>adminCode2:</td><td> ' + result.data.adminCode2 + "</td>";
                    res += '</tr><tr>';
                    res += '<td>adminName2:</td><td> ' + result.data.adminName2 + "</td>";
                    res += '</tr>';
                    res += '</table>';
                    // alert(res);
                    $('#result').html(res);
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
                // your error code
            }
        });
    }

});