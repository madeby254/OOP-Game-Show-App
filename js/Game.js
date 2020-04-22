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
		var randomPhrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
		return randomPhrase;
	};
	// Create phrases
	createPhrases() {
		var phrase = [new Phrase("Hi I AM DAVE")
			, new Phrase("If you smell what the rock is cooking")
			, new Phrase("Bye keisha")
			, new Phrase("WHO let the dogs out")
			, new Phrase("we are in kansas")
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
		var liElements = document.querySelectorAll('#phrase li');
		var sentinal = true;
		for (let i = 0; i < liElements.length; i++) {
			if (!(liElements[i].className == "show letter" || liElements[i].className == "space")) {
				sentinal = false;
			}
		}
		return sentinal;
	};
	/**
	 * Increases the value of the missed property
	 * Removes a life from the scoreboard
	 * Checks if player has remaining lives and ends game if player is out
	 */
	removeLife(letter) {
		//increases missed by 1
		this.missed += 1;
		//if missed is less than 5
		if (this.missed < 5) {
			let listItems = document.getElementsByClassName("tries");
			console.log(listItems)
			listItems[5 - this.missed].firstElementChild.src = "images/lostHeart.png";
		} else {
			this.gameOver(false);
		}
	};
	// /**
	//* Displays game over message
	//* @param {boolean} gameWon - Whether or not the user won the game
	//*/
	gameOver(gameWon) {
		//variable messageElement targets h1 html element
		var messageElement = document.getElementById("game-over-message");
		//variable targets div html element
		var overlayElement = document.getElementById('overlay');
		overlayElement.style.display = 'block';
		if (gameWon) {
			//if game won is true, implement these content and style changes
			messageElement.className += 'win';
			messageElement.innerHTML = "You want a cookie now!";
			messageElement.style.color = '#FFFFFF';
			messageElement.style.backgroundColor = '#7BCE85';
			messageElement.style.backgroundImage = "url('images/balloons.gif')";
			overlayElement.style.backgroundColor = '#7BCE85';
			overlayElement.style.backgroundImage = "url('images/balloons.gif')";
		} else {
			//if game won is false, implement these content and style changes
			messageElement.className += 'lose';
			messageElement.innerHTML = "Do not look at the code thats cheating";
			messageElement.style.color = '#8A2BE2';
			messageElement.style.backgroundImage = 'none';
			var image = document.getElementsByClassName('start')[0];
			document.getElementById('game-over-message')
				.style.backgroundColor = '#000000';
			overlayElement.style.backgroundImage = "url('images/skull.gif')";
			overlayElement.style.backgroundColor = '#000000';
		}
	}
	handleInteraction(button) {
		//access text content of button/event.target and assign to letter
		var letter = button.textContent;
		//disable button pressed
		button.disabled = true;
		//if check letter returns true, call showMatchedLetter and add class chosen
		if (this.activePhrase.checkLetter(letter)) {
			this.activePhrase.showMatchedLetter(letter);
			button.classList.add('chosen');
			//if checkForWin method true, call gameOver method and game is won
			if (this.checkForWin()) {
				this.gameOver(true);
			}
			//if checkLetter method returns false, remove life and add class name wrong to button pressed
			//if removeLife missed is not less than five, gameWon will be false, and game is lost
		} else {
			this.removeLife();
			button.classList.add('wrong');
		}
	}
	resetGameboard() {
		//missed is set to 0
		this.missed = 0;
		//variable liElements is used to select current phrase letter elements
		var liElements = document.querySelectorAll('#phrase ul');
		//variable listItems selects the elements containing heart icon
		let listItems = document.getElementsByClassName("tries");
		//liElements variable used to clear the content of the current phrase
		liElements[0].innerHTML = " ";
		//keys variable equals elements of screen keyboard
		let keys = document.getElementsByClassName("key");
		//for loop loops through keyboard elements, and if they have class name
		//wrong or chosen, the key will be enabled and remove these classes
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