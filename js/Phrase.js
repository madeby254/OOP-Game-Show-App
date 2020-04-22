/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

//changes to all lowercase
//Display phrase on game board

class Phrase {
	constructor(phrase) {
		this.phrase = phrase.toLowerCase();
	}
	 
	addPhraseToDisplay() {
		for (let i = 0; i < this.phrase.length; i++) {
			let li = document.createElement("li");
            li.innerHTML = this.phrase[i];
            
			if (this.phrase[i] === " ") {
				li.className = "space";
				
			} else {
				li.className = "hide letter " + this.phrase[i];
			}
			document.querySelector('#phrase ul')
				.appendChild(li);
		}
	}
	// Checks if passed letter is in phrase
	checkLetter(letter) {
		if (this.phrase.indexOf(letter) > -1) {
			return true;
		}
		return false;
	}
	// Display letter on screen if there is a match
	showMatchedLetter(letter) {
		//letiable liElements holds node list array of the li elements and their properties
		let liElements = document.querySelectorAll('#phrase li');
		for (let i = 0; i < liElements.length; i++) {
			if (liElements[i].innerHTML === letter) {
				liElements[i].className = "show letter";
			}
		}
	}
}