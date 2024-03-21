
<!DOCTYPE html>

<html>
<head>
    <title> Tetris web! </title>
    <link rel = "stylesheet" href = "main.css">
    <script src = "main.js"></script>
</head>
<body>
    <video  autoplay loop muted>
        <source src="media/lumines.mp4" type="video/mp4" />
    </video>
    <h3>LUMINTETRIS</h3>
    <div class = "screen">
        <div class = "grid"></div>
        <div class = misc>
            <div class = "mini-grid">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div id = "time">Time:<br></div>
            <div id = "score">Score:<br></div>
            <div id = "level">Speed:<br></div>
        </div>
    </div>
    <div id="leaderboard">
        <table id="ranking-table">
            <tr>
                <th>#</th>
                <th>Usuário</th>
                <th>Hi-Score</th>
            </tr>
            <?php
            $posicao = 1;
            while ($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td class='conteudo'>" . $posicao . "</td>";
                echo "<td class='conteudo'>" . $row['username'] . "</td>";
                echo "<td class='conteudo'>" . $row['score'] . "</td>";
                echo "</tr>";
                $posicao++;
            }
            ?>
        </table>
    </div>
</body>

</html>
