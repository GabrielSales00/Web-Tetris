<!DOCTYPE html>

<html>
<head>
    <title> Tetris web! </title>
    <link rel = "stylesheet" href = "main.css">
    <script src = "main.js"></script>
</head>
<body>
    <h3>LUMINTETRIS</h3>
    <div class = "login">
            <p>Cadastro</p>
            <form action = "autenticar.php" method = "post">
                <label for="name">Nome:</label><br>
                <input type="text" id="name" name="name"><br><br>
                <label for="id">CPF:</label><br>
                <input type="text" id="id" name="id"><br><br>
                <label for="date">Data de Nascimento:</label><br>
                <input type="date" id="date" name="date"><br><br>
                <label for="phone">Telefone:</label><br>
                <input type="text" id="phone" name="phone" placeholder="Número de telefone"><br><br>
                <label for="email">E-Mail:</label><br>
                <input type="text" id="email" name="email"><br><br>
                <label for="username">Username:</label><br>
                <input type="text" id="username" name="username"><br><br>
                <label for="password">Senha:</label><br>
                <input type="password" id="password" name="password"><br>
            
                <br>
                <br>
                <button type="submit" class="Login" id="login" name="login" onclick="location.href='index.html';">Começar o jogo</button>
            </form>
        </div>
</body>

</html>