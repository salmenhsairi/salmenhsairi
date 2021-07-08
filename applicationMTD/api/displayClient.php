<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");

if (!isset($_GET['id'])) {
    http_response_code(400);
    $message = array("message" => "user id not mensionned");
    echo json_encode($message);
}else{
$id = $_GET['id'] ;
$query = "SELECT c.id, c.name, c.telephone, c.email, c.photo,v.name 'ville', t.name 'type', h.name 'handicap', l.name 'lieu' 
    FROM clients c
    left JOIN villes v ON v.id = c.ville_id 
    left JOIN types t ON t.id = c.type_id 
    left JOIN typehandicaps h ON h.id = c.typehandicap_id 
    left JOIN lieus l ON l.id = c.lieu_id where c.id = $id " ; 

$affichage = mysqli_query($connect, $query);


$ligne = mysqli_fetch_array($affichage);

if ($ligne){
    $user = array(
        "id" => $ligne['id'],
        "name" => $ligne['name'],
        "telephone" => $ligne['telephone'],
        "email" => $ligne['email'],
        "photo" => $ligne['photo'],
        "ville" => $ligne['ville'],
        "type" => $ligne['type'],
        "handicap" => $ligne['handicap'],
        "lieu" => $ligne['lieu']
    );
    http_response_code(200);
    echo json_encode($user);
}
else{
    http_response_code(404);
    $message = array("message" => "user with id $id not found in the db ");
    echo json_encode(array($message));
}}


