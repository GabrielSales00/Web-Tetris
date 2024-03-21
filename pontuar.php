<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "user";
$conn = new mysqli($servername, $username, $password, $dbname);


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $pontuacao = isset($data['score']) ? $data['score'] : null;
    $id_usuario = isset($_SESSION['id']) ? $_SESSION['id'] : null;

    $sql = "INSERT INTO score (id_user, score) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $id_usuario, $pontuacao);

    $stmt->close();
    $conn->close();
}
?>