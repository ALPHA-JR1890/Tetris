document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const width = 10;
    let score = 0;

    // Create the grid
    for (let i = 0; i < 200; i++) {
        const cell = document.createElement('div');
        grid.appendChild(cell);
    }

    // Tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ];

    let currentPosition = 4;
    let currentRotation = 0;

    // Randomly select a Tetromino
    let random = Math.floor(Math.random() * lTetromino.length);
    let current = lTetromino[random][currentRotation];

    // Draw the Tetromino
    function draw() {
        current.forEach(index => {
            grid.children[currentPosition + index].classList.add('tetromino');
        });
    }

    // Undraw the Tetromino
    function undraw() {
        current.forEach(index => {
            grid.children[currentPosition + index].classList.remove('tetromino');
        });
    }

    // Move Tetromino down
    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    // Freeze the Tetromino
    function freeze() {
        if (current.some(index => grid.children[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => grid.children[currentPosition + index].classList.add('taken'));
            // Start a new Tetromino
            random = Math.floor(Math.random() * lTetromino.length);
            current = lTetromino[random][currentRotation];
            currentPosition = 4;
            draw();
            addScore();
        }
    }

    // Add score
    function addScore() {
        for (let i = 0; i < 199; i += width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];
            if (row.every(index => grid.children[index].classList.contains('taken'))) {
                score += 10;
                scoreDisplay.innerHTML = score;
                row.forEach(index => {
                    grid.children[index].classList.remove('taken');
                    grid.children[index].classList.remove('tetromino');
                });
                const squaresRemoved = Array.from(grid.children).splice(i, width);
                squaresRemoved.forEach(cell => grid.appendChild(cell));
            }
        }
    }

    // Move Tetromino down every second
    setInterval(moveDown, 1000);
});
