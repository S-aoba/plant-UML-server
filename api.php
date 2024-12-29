<?php

require_once 'vendor/autoload.php';

use Models\PlantUMLServer;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = file_get_contents('php://input');

  $plantUMLServer = new PlantUMLServer($data);
  $encodedData = $plantUMLServer->getUMLImage();
  
  echo json_encode(['url' => $encodedData]);
  exit;
}
else {
  exit; 
}