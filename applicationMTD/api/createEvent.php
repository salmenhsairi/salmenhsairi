<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('Connect.php');
mysqli_query($connect, "SET NAMES 'utf8'");
$data = json_decode(file_get_contents("php://input"));

$image = $data->image;
$video = $data->video;
$audio = $data->audio;
$titre = $data->titre;
$titre_ar = $data->titre_ar;
$description = $data->description; 
$description_ar = $data->description_ar;
$adresse = $data->adresse;
$lieu_id = $data->lieu_id;
$client_id = $data->client_id;
$categorieevent_id = $data->categorieevent_id;
$type = $data->type;
$ticket = $data->ticket;
$valide = $data->valide;

$query = "INSERT INTO events "."
        SET 
        image = '$image' ,
        video = '$video' ,
        audio = '$audio' ,
        titre = '$titre' ,
        titre_ar = '$titre_ar' ,
        description = '$description',
        description_ar = '$description_ar',
        adresse = '$adresse' ,
        date = Date(sysdate()) ,
        heure = TIME_FORMAT(sysdate(),'%H:%i:%s'),
        lieu_id = $lieu_id , 
        client_id = $client_id ,
        categorieevent_id = $categorieevent_id ,
        type = $type ,
        ticket = $ticket ,
        etat = $valide ,
        localisation = '' ";
        


if ($connect->query($query) === TRUE) {
  http_response_code(200);
  echo json_encode(array('message' => 'record successfully added ' ));
} else {
  http_response_code(400);
  echo json_encode(array('message' => 'unhandled error' ));
}

// try{
//     $connect->query($query);
//     echo json_encode(array('message' => 'record successfully added '));
// }catch (Exception $e){
//     http_response_code(400);
//     echo json_encode(array('message' => $e->getMessage()));
// }

?>