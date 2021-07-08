<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");

$retour = array();
$data = json_decode(file_get_contents("php://input"));

$filter = strtoupper($data->query);
$nbr_element_page = $data->limit;
$numero_page_maintenant = $data->page;
$page = $numero_page_maintenant ? $numero_page_maintenant : '';
$debut = ($page - 1) * $nbr_element_page;

$query = "SELECT c.id, c.name, c.telephone, c.email,v.name 'ville', t.name 'type', h.name 'handicap' 
    FROM clients c
    left JOIN villes v ON v.id = c.ville_id 
    left JOIN types t ON t.id = c.type_id 
    left JOIN typehandicaps h ON h.id = c.typehandicap_id WHERE (UPPER(c.name) LIKE '%" . $filter . "%')";

$query = $query . " LIMIT $debut,$nbr_element_page";
$affichage = mysqli_query($connect, $query);


while ($ligne = mysqli_fetch_array($affichage)) {
    $user = array(
        "id" => $ligne['id'],
        "name" => $ligne['name'],
        "telephone" => $ligne['telephone'],
        "email" => $ligne['email'],
        "ville" => $ligne['ville'],
        "type" => $ligne['type'],
        "handicap" => $ligne['handicap']
    );
    array_push($retour, $user);
}

$query2 = "SELECT COUNT(*) FROM clients c WHERE (UPPER(c.name) LIKE '%" . $filter . "%')";
$affichage = mysqli_query($connect, $query2) or die(mysqli_error($connect));
$ligne = mysqli_fetch_array($affichage);
$nombreDeChamp = intval($ligne['0']);
$tous = array(
    "data" => $retour,
    "total" => $nombreDeChamp,
    "query" => $query
);

http_response_code(200);
echo json_encode($tous);
