/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
//event listener added on start button


let game = 'null';
window.onload = function() {
	document.getElementById('btn__reset')
		.addEventListener('click', function() {
			game = new Game();
			//call methods to begin or reset game
			game.resetGameboard();
			game.startGame();
		});
	//click event listener to each item with class key
    document.querySelectorAll('.key')
		.forEach(item => {
			item.addEventListener('click', event => {
				game.handleInteraction(event.target);
			})
		})
	//Keyboard listener 
	document.addEventListener('keyup', (event) => {
		document.querySelectorAll('.key')
			.forEach(item => {
				if (event.key.toLowerCase() == item.innerHTML) {
					item.click();
				}
			})
	})
}