 
<?php

    $executionStartTime = microtime(true) / 1000;
    $result = file_get_contents('../json/airports.geojson');

	$airports = json_decode($result, true);	



    
	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "mission saved";
    $output['status']['executedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	
	$output['airports'] = $airports;
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>