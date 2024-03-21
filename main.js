//O evento DOM Content Loaded é ativado quando o arquivo HTML é carregado 
//e passado. 

document.addEventListener('DOMContentLoaded', () => {
    /*Esse método procura por algum elemento no .html cuja classe 
    tem o nome de "grid" */
    /*Agora sempre que modificarmos 'grid', queremos modificar todos
    os elementos englobados na class*/ 
    const grid = document.querySelector('.grid');

    let score;
    let currentTimeRef = 350;
    let currentSpeed = currentTimeRef;
    let inverted = false;
    let gameOverStatus = false;

    const colors = [
        'blue',
        'red',
        'green',
        'yellow',
        'orange', 
        'cyan',
        'gold'
      ];
    

    function createDivs(numDivs) {
        for (let i = 0; i < numDivs; i++) {
            div = document.createElement("div");
            grid.appendChild(div);
        }
    }

    const Numero_divs = 200;

    createDivs(Numero_divs);

    /*Cria o array a partir dos divs*/
    let squares = Array.from(document.querySelectorAll('.grid div'));
    let time = 0;
    let timer;
    let count;
    let gameHasStarted;

    const width = 10;
    const height = 20;

    console.log(squares);

    /********************************Game Start************************************ */
    function startGame() {
        gameHasStarted = false;
        score = 0;
        count = setInterval(move, currentSpeed);
        timer = setInterval(countTime, currentTimeRef);

    }

    function countTime() {
        time += 1;
    }

    startGame();

    /********************************Score****************************************** */

    function addScore(number) {
        score += number;
        showScore();
    }


    /*******************************Game Over?*************************** */
    function isGameOver() {
        if (currentShape.some(index => squares[position + index].classList.contains('taken'))) {
            currentSpeed = 0;
            currentTimeRef = 0;
            console.log('Game Over!')
            gameOverStatus = true;
            storeScore(score);
        }
    }


    /*********************************Restart************************************* */
    function restartGame() {
        clearGrid();
        restarttime();
        showTimer()
        restartScore();
        showScore();
        restartLevel();
        showLevel();
        gameOverStatus = false;
    }

    function clearGrid() {
        squares.forEach(square => square.classList.remove('shape'));
        squares.forEach(square => square.classList.remove('special'));
        squares.forEach(square => square.classList.remove('taken'));
        squares.forEach(square => square.style.backgroundColor = "");
        makeBorders();
    }

    function restarttime() {
        time = 0;
    }
    
    function restartScore() {
        score = 0;
    }
    
    function restartLevel() {
        level = 0;
        currentSpeed = currentTimeRef;
        
    }

    /**********************************Displays********************************** */
    let scoreElem = document.getElementById('score');
    
    function showScore() {
        scoreElem.innerHTML = `Score: <br> ${score}`;
    }

    showScore();


    let timeElem = document.getElementById('time');

    function showTimer() {
        timeElem.innerHTML = `Time: <br> ${time}`;
    }

    showTimer();

    let levelElem = document.getElementById('level')

    let level = 0;
    
    function showLevel() {
        levelElem.innerHTML = `Speed: <br> ${level}`;
    }

    showLevel();


    /*************************************Increase speed*********************************/
    function increaseSpeedIf() {
        if ((time > 1 && time % 100 == 0) || (score > 50 && score & 100 == 0)) {
            level++;
            currentSpeed -= 20;
            console.log("speed changed!" + currentSpeed);
            clearInterval(count);
            count = setInterval(move, currentSpeed);
            showLevel();
        }
    }

    /*****************************Definindo as borders********************************* */
    function makeBorders() {
        for (let i = squares.length - width; i < squares.length; i++) {
            squares[i].classList.add('taken');
        }
        
        for (let i = 0; i < (width*height-1); i+=width) {
            squares[i].classList.add('taken');
        }
    
        for (let i = (width-1); i < (width*height-1); i+=width) {
            squares[i].classList.add('taken');
        }
    }
    
    makeBorders();



    //As formas:
    
    /*formato de L. Representado por um vetor com quatro vetores dentro
    cada vetor representa o formato assumido por cada rotação*/
    const lShape = [
        //forma: [posição em y (width) + posição em x] (posição dos quadrados)
        [1, width+1, width*2+1, 2],
        [width, width + 1, width + 2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2] 
    ]

    const oppositeLShape = [ //opposite L
        [1, width+1, width*2+1, width*2+2],
        [width, width+1, width+2, width*2],
        [1, width+1, width*2+1, 0], 
        [width+2, width*2, width*2+1, width*2+2] 
    ]

    const zShape = [
        [width*2, width+1, width*2 +1, width +2 ],
        [0, width, width + 1, width*2 + 1],
        [width*2, width + 1, width*2 + 1, width + 2],
        [0, width, width + 1, width*2 + 1]
    ]

    const tShape = [
        [width, 1, width + 1, width + 2],
        [1, width + 1, width*2 + 1, width + 2],
        [width, width + 1, width * 2 + 1, width +2],
        [width, 1, width + 1, width * 2 + 1]
    ]

    const squareShape = [
        [0, width, 1, width + 1],
        [0, width, 1, width + 1],
        [0, width, 1, width + 1],
        [0, width, 1, width + 1]
    ]

    const iShape = [
        [1, width + 1, width *2 + 1, width *3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width *2 + 1, width *3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]

    const uShape = [
        [width*2, width*2+1, width*2+2, width, width+2],
        [0, width, width*2, 1, width*2+1],
        [width, width+1, width+2, width*2,width*2+2],
        [1, width*2+1, 2, width+2, width*2+2]
    ]

    const specialShape = [
        [0],
        [0],
        [0],
        [0]
    ]

    const shapes = [lShape,oppositeLShape, zShape, tShape, iShape, squareShape, uShape, specialShape];


    //Posição inicial
    let initPosition = 5;
    let random = initRandom();
    let currentRandom = random;
    let position = initPosition;



    //Forma a ser desenhada na tela
    function initRandom() {
        let random = Math.floor(Math.random() * shapes.length);
        return random;
    }
    
    
    let rotation = 0;


    console.log(shapes);
    //Função para desenhar forma
    //A função irá apenas atribuir a classe, cujo estilo está descrito no CSS, aos formatos
    function draw() {
        if(currentShape === shapes[7][rotation]) {
            currentShape.forEach( index => {
                squares[position + index].classList.add('special');
            })
        }
        else {
            currentShape.forEach( index => {
                squares[position + index].classList.add('shape');
                squares[position + index].style.backgroundColor = colors[currentRandom];
            })
        }

    }


    function undoDraw() {
        if(currentShape === shapes[7][rotation]) {
            currentShape.forEach( index => {
                squares[position + index].classList.remove('special');
            })
        }
        else {
            currentShape.forEach( index => {
                squares[position + index].classList.remove('shape');
                squares[position + index].style.backgroundColor = '';
            })
        }
    }

    /**************Collision Check************************* */
    function checkGround() {
        
        if(currentShape.some(index => squares[position + index + width].classList.contains("taken"))) {
            currentShape.forEach(index => squares[position + index].classList.add("taken"));
            if(currentShape === shapes[7][rotation]) {
                currentShape.forEach(index => squares[position + index].classList.add('special'));
                currentShape.forEach(index => squares[position + index].style.backgroundColor = 'rgb(240,230,140)')
            }
            currentShape.forEach(index => squares[position + index].style.backgroundColor = colors[currentRandom]);
            currentRandom = random;
            currentShape = newShape();
            checkRow();
            random = initRandom();
            showNextShape();
        }
    }

    function newShape() {
        position = initPosition;
        //reinitializes currentShape
        let shape = shapes[currentRandom][rotation];
        //reminder that the random variable is reinitialized for showNextShape()
        return shape;
    }
    
    function changeInvertStatus() {
        if(inverted === true) {
            inverted = false;
        }
        else {
            inverted = true;
        }
    }

    function checkRow() {
        let numClearedRows = 0;
        for(let i = 1; i < (width*(height-1)-2); i+=width){
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
            if(row.every(index => squares[index].classList.contains('taken'))) {
                const clearedSqrs = squares.splice(i, width);
                numClearedRows++;
                addScore(10);
                if (clearedSqrs.some(index => index.classList.contains('special'))) {
                    invertGrid();
                }
                clearedSqrs.forEach((index) => {
                    index.classList = '';
                    index.style.backgroundColor = '';
                })
                clearedSqrs[0].classList.add('taken'); //primeiro
                clearedSqrs[clearedSqrs.length-1].classList.add('taken'); //último
                squares = clearedSqrs.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
              
            }
        }

        if (numClearedRows > 1) {
            addScore(10*numClearedRows);
        }
        console.log("New score = " + score);
    }

    /**************Controls*************** */
    document.addEventListener('keyup', control);
    function control(e) {
        switch(e.keyCode) {
            case 32:
                if(gameOverStatus == true) {
                    console.log("Restarting!");
                    restartGame();
                }
                break;
            case 37:
                if(inverted === true) {
                    moveRight();
                }
                else {
                    moveLeft();
                }
                break;
            case 39:
                if(inverted === true) {
                    moveLeft();
                }
                else {
                    moveRight();
                }
                break;
            case 38:
                rotate();
                break;
            case 40:
                drop();
                break;
        }

    }

    //Fazer a forma desaparecer e aparecer embaixo:

    function move() {
        if (gameOverStatus == false) {
            checkGround();
            isGameOver();
            increaseSpeedIf();
            undoDraw();
            position += width;
            draw();
            showTimer();
        }
    }

    function storeScore(score) {
        fetch('score.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ score: score }),
        })
        .then(response => {
            if (response.ok) {
                alert('Score sent successfully!');
            } else {
                alert('Error sending score:', response.statusText);
            }
        })
        .catch(error => {
             alert('Error sending score:', error);
        });
    }
    

    function moveLeft(){
        undoDraw();
        const isAtEdge = currentShape.some(index => (position + index) % width == 0);
      
        if(!isAtEdge){
            position -= 1; //vai pra esquerda
        }
      
        if(currentShape.some(index => squares[position + index].classList.contains("taken"))) {
            position += 1; //volta pra direita caso tenha algo na esquerda
        }
      
        draw();
    }

    function moveRight() {
        undoDraw();
        const isAtEdge = currentShape.some(index => (position + index) % width == 0);
      
        if(!isAtEdge){
            position += 1; //vai pra esquerda
        }
      
        if(currentShape.some(index => squares[position + index].classList.contains("taken"))) {
            position -= 1; //volta pra direita caso tenha algo na esquerda
        }
      
        draw();
    }

    function rotate () {
        undoDraw();
  
        let newRot = rotation + 1;
      
        if (newRot === 4) {
          newRot = 0;
        }
      
        const nextRot = shapes[currentRandom][newRot]; 
       
        const hasCollision = nextRot.some(index => squares[position + index].classList.contains("taken"));
      
        if (!hasCollision) {
          rotation = newRot;
          currentShape = nextRot;
        }
      
        
        draw();
    }

    function drop() {
        while (!currentShape.some(index => squares[position + index + width].classList.contains("taken"))) {
            move();
        }
        undoDraw();
    }

    

    function invertGrid () {
        changeInvertStatus();
        console.log('Inverted!');
        for(let i = 0; i < (width * (height - 1)) - 2; i += width) {
            const clearedSquares = squares.slice(width*(height-2), width*(height-2) + width); //linha original
            const invertedSquares = []; 
            

            for (let invertedCollumn = clearedSquares.length - 1, collumn = 0; collumn < clearedSquares.length; collumn++, invertedCollumn--) 
            {
                invertedSquares[invertedCollumn] = clearedSquares[collumn];
            }
            
    
            squares.splice(width*(height-2), width);
            squares = invertedSquares.concat(squares);
            squares.forEach(cell => grid.appendChild(cell));
        }
    }    


        //show up next grid
    const miniSquares = (document.querySelectorAll(".mini-grid div"));
    const miniWidth = 4;
    let displayIndex = 0;

    //the tetraminos without rotations
    const nextShape = [
        [1, miniWidth+1, miniWidth*2+1, 2],
        [1, miniWidth+1, miniWidth*2+1, miniWidth*2+2],
        [miniWidth*2, miniWidth+1, miniWidth*2 +1, miniWidth +2 ],
        [miniWidth, 1, miniWidth + 1, miniWidth + 2],
        [1, miniWidth + 1, miniWidth *2 + 1, miniWidth *3 + 1],
        [0, miniWidth, 1, miniWidth + 1],
        [miniWidth*2, miniWidth*2+1, miniWidth*2+2, miniWidth, miniWidth+2],
        [0, 0, 0, 0]
    ]

    function showNextShape(){
        miniSquares.forEach(square => {
            square.classList.remove('nextshape'); 
            square.style.backgroundColor = ""; 
        })
        nextShape[random].forEach(index => {
            miniSquares[index + displayIndex].classList.add("nextshape");
            if (random == 7) {
                miniSquares[index + displayIndex].style.backgroundColor = 'rgb(240,230,140)';               
            }
            else { 
                miniSquares[index + displayIndex].style.backgroundColor = colors[random];
            }
        })
    }



      let currentShape = newShape();
      showNextShape()

      

})
