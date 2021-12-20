<?php
 
	$executionStartTime = microtime(true);

    $countryData = json_decode(file_get_contents("../json/countryBorders.geo.json"), true);

    $countries=[];
    $country = $_REQUEST['countryName'];
   foreach ($countryData['features'] as $feature) {

        if($feature["properties"]['name']===$country){

        $temp = null;

        

        

        $temp['borders'] = $feature["geometry"];

        array_push($countries, $temp);
        }
        

    }

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $countries; 
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>

 