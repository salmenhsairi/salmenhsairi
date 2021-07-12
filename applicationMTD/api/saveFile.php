<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");

    if (!isset($_GET['file'])) {
    http_response_code(400);
    $message = array("message" => "file name is not mensionned");
    echo json_encode($message);
}
    else {
        $fileName = $_GET['file'];
        $extension = explode('.', $fileName)[1];
        if(!$extension){
            $message = array("message" => "invalid file extension");
            echo json_encode($message);
        }
        else{
            $inputdata = json_decode(file_get_contents("php://input"));
            $file64 = $inputdata->file;
            $data = explode(',', $file64);
            $location = $_SERVER['DOCUMENT_ROOT'];
            file_put_contents($location . "/applicationMTD/api/files/$fileName",base64_decode($data[1]));
            echo json_encode(array("message" => "success !"));
        }
    }
    
?>