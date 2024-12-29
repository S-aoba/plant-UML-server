<?php

namespace Models;

use function Jawira\PlantUml\encodep;

class PlantUMLServer {
  const PLANT_UML_SERVER_URL='http://www.plantuml.com/plantuml/svg';
  private string $data;

  public function __construct(string $data) {
    $this->data = $data;
  }

  public function getUMLImage(): string {
    return $this->encode($this->data);
  }

  private function encode(string $data): string {
    $uml = str_replace('@startuml', '', $data);
    $uml = str_replace('@enduml', '', $uml);

    $encode = encodep($uml);
    $path = self::PLANT_UML_SERVER_URL . '/' . $encode;
    return $path;
  }
}