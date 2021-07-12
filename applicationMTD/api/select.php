<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('Connect.php');
mysqli_query($connect, "SET NAMES 'utf8'");
$tables = array("1" => "clients" , "2" => "categorieevents","3" => "lieus");

if (!isset($_GET['table'])) {
    http_response_code(400);
    $message = array("message" => "table id is not mensionned");
    echo json_encode($message);
} else {

$tableid = $_GET['table'];
$table = $tables["$tableid"];

$query = "SELECT id,name FROM $table";
$result = mysqli_query($connect, $query);
$retour = array();

while ($ligne = mysqli_fetch_array($result)) {
    $row = array(
        "value" => $ligne['id'],
        "label" => $ligne['name'],
    );
    array_push($retour, $row);
}
    http_response_code(200);
    echo json_encode($retour);
}
?>