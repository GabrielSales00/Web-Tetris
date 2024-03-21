<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "user";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nomeUsuario = $_POST['username'];
    $senha = $_POST['password'];

    $sql = "SELECT password, username FROM players WHERE username = '$nomeUsuario' AND password = '$senha'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $_SESSION['password'] = $row['passowrd'];
        $_SESSION['username'] = $row['username'];

        header("Location: game.php");
        exit();
    } else {
        header("Location: index.html");
        exit();
    }
}
$conn->close();
?>