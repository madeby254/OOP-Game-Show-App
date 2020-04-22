/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
//track the number of missed guesses by the player
class Game {
	constructor() {
		this.missed = 0;
		this.phrases = this.createPhrases();
		this.activePhrase = 'null';
	}
	// Selects random phrase from phrases
	getRandomPhrase() {
		let randomPhrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
		return randomPhrase;
	};
	// Create phrases
	createPhrases() {
		let phrase = [new Phrase("Hi I AM DAVE")
			, new Phrase("If you smell what the rock is cooking")
			, new Phrase("Bye keisha")
			, new Phrase("WHO let the dogs out")
			, new Phrase("we are not in kansas anymore")
		];
		return phrase;
	}
	//Begin game by selecting a random phrase 

	startGame() {
		document.querySelector('#overlay')
			.style.display = 'none';
		this.activePhrase = this.getRandomPhrase();
		this.activePhrase.addPhraseToDisplay();
	}
	// Check if game is won
	checkForWin() {
		let liElements = document.querySelectorAll('#phrase li');
		let sentinal = true;
		for (let i = 0; i < liElements.length; i++) {
			if (!(liElements[i].className == "show letter" || liElements[i].className == "space")) {
				sentinal = false;
			}
		}
		return sentinal;
	};
     // checks if player has lives left if not game is over && Removes a life from score
	removeLife(letter) {
		this.missed += 1;
		if (this.missed < 5) {
			let listItems = document.getElementsByClassName("tries");
			console.log(listItems)
			listItems[5 - this.missed].firstElementChild.src = "images/lostHeart.png";
		} else {
			this.gameOver(false);
		}
	};
	// Displays a message when game is Over
	gameOver(gameWon) {
		let messageElement = document.getElementById("game-over-message");
		let overlayElement = document.getElementById('overlay');
		overlayElement.style.display = 'block';
		if (gameWon) {
			//if game is won
			messageElement.className += 'win';
			messageElement.innerHTML = "Well Done you won. You get cookies YAAYYY!!";
			messageElement.style.color = '#1E1B18';
			messageElement.style.backgroundColor = '#1E3F20';
			messageElement.style.backgroundImage = "url('images/cookies.gif')";
			overlayElement.style.backgroundColor = '#1E3F20';
			overlayElement.style.backgroundImage = "url('images/cookies.gif')";
		} else {
			//if game is lost 
			messageElement.className += 'lose';
			messageElement.innerHTML = "Sorry How about another try!";
			messageElement.style.color = '#D94545';
			messageElement.style.backgroundImage = 'none';
			let image = document.getElementsByClassName('start')[0];
			document.getElementById('game-over-message')
				.style.backgroundColor = '#000000';
			overlayElement.style.backgroundImage = "url('images/GameOver.gif')";
			overlayElement.style.backgroundColor = '#000000';
		}
    }
  // call gameOver method and game is won
	handleInteraction(button) {
		let letter = button.textContent;
		button.disabled = true;
		if (this.activePhrase.checkLetter(letter)) {
			this.activePhrase.showMatchedLetter(letter);
			button.classList.add('chosen');
			if (this.checkForWin()) {
				this.gameOver(true);
			}
		} else {
			this.removeLife();
			button.classList.add('wrong');
		}
    }
    
    //checkForWin method true, call gameOver method and game is won
	resetGameboard() {
		this.missed = 0;
		let liElements = document.querySelectorAll('#phrase ul');
		let listItems = document.getElementsByClassName("tries");
		liElements[0].innerHTML = " ";
		let keys = document.getElementsByClassName("key");
		for (let j = 0; j < keys.length; j++) {
			if (keys[j].classList.contains('wrong') || keys[j].classList.contains('chosen')) {
				keys[j].disabled = false;
				keys[j].classList.remove("wrong");
				keys[j].classList.remove("chosen");
			}
		}
		//this for loop loops through lost heart elements and changes them back to live hearts
		for (let i = 0; i < listItems.length; i++) {
			listItems[i].firstElementChild.src = "images/liveHeart.png";
		}
	}
}