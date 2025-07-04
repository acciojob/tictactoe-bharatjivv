//your JS code here. If required.
document.addEventListener('DOMContentLoaded', function() {
            const inputSection = document.getElementById('input-section');
            const gameSection = document.getElementById('game-section');
            const submitBtn = document.getElementById('submit');
            const messageDiv = document.getElementById('message');
            const boardDiv = document.getElementById('board');
            
            let player1 = 'Player1';
            let player2 = 'Player2';
            let currentPlayer = 1;
            let gameBoard = ['', '', '', '', '', '', '', '', ''];
            let gameActive = true;
            
            // Initialize the board with default player names
            document.getElementById('player1').value = player1;
            document.getElementById('player2').value = player2;
            
            // Create the board cells
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.id = (i + 1).toString();
                cell.dataset.index = i;
                cell.addEventListener('click', handleCellClick);
                boardDiv.appendChild(cell);
            }
            
            submitBtn.addEventListener('click', function() {
                player1 = document.getElementById('player1').value.trim() || 'Player1';
                player2 = document.getElementById('player2').value.trim() || 'Player2';
                
                inputSection.classList.add('hidden');
                gameSection.classList.remove('hidden');
                
                updateMessage(`${player1}, you're up!`);
            });
            
            function handleCellClick(e) {
                const index = parseInt(e.target.dataset.index);
                
                if (!gameActive || gameBoard[index] !== '') return;
                
                gameBoard[index] = currentPlayer === 1 ? 'x' : 'o';
                e.target.textContent = gameBoard[index];
                
                if (checkWin()) {
                    const winner = currentPlayer === 1 ? player1 : player2;
                    updateMessage(`${winner} congratulations you won!`);
                    gameActive = false;
                    return;
                }
                
                if (checkDraw()) {
                    updateMessage("Game ended in a draw!");
                    gameActive = false;
                    return;
                }
                
                currentPlayer = currentPlayer === 1 ? 2 : 1;
                const nextPlayer = currentPlayer === 1 ? player1 : player2;
                updateMessage(`${nextPlayer}, you're up!`);
            }
            
            function checkWin() {
                const winPatterns = [
                    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
                    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
                    [0, 4, 8], [2, 4, 6]             // diagonals
                ];
                
                return winPatterns.some(pattern => {
                    const [a, b, c] = pattern;
                    return gameBoard[a] !== '' && 
                           gameBoard[a] === gameBoard[b] && 
                           gameBoard[a] === gameBoard[c];
                });
            }
            
            function checkDraw() {
                return gameBoard.every(cell => cell !== '');
            }
            
            function updateMessage(msg) {
                messageDiv.textContent = msg;
            }
            
            // Expose functions for testing
            window.game = {
                resetGame: function() {
                    gameBoard = ['', '', '', '', '', '', '', '', ''];
                    currentPlayer = 1;
                    gameActive = true;
                    
                    document.querySelectorAll('.cell').forEach(cell => {
                        cell.textContent = '';
                    });
                    
                    updateMessage(`${player1}, you're up!`);
                },
                getCurrentPlayer: function() {
                    return currentPlayer;
                },
                getGameBoard: function() {
                    return gameBoard;
                }
            };
        });