<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "user";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die($conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nomeCompleto = $_POST['name'];
    $cpf = $_POST['id'];
    $data = $_POST['date'];
    $telefone = $_POST['phone'];
    $email = $_POST['email'];
    $nomeUsuario = $_POST['username'];
    $senha = $_POST['password'];

    $sql = "INSERT INTO players (name, id, date, phone, email, username, password) 
    VALUES ('$nomeCompleto','$cpf', '$data', '$telefone', '$email', '$nomeUsuario', '$senha')";

    echo "inserido!";
    if ($conn->query($sql) === TRUE) {
        header("Location: index.html");
        exit();
    } else {
        echo "Erro ao criar registro: " . $conn->error;
    }

}

$conn->close();
?>
