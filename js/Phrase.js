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
			var li = document.createElement("li");
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
		//checks if parameter letter is in phrase, returns more than -1 if true, -1 if false
		if (this.phrase.indexOf(letter) > -1) {
			return true;
		}
		return false;
	}
	/**
	 * Displays passed letter on screen after a match is found
	 * @param (string) letter - Letter to display
	 */
	showMatchedLetter(letter) {
		//variable liElements holds node list array of the li elements and their properties
		var liElements = document.querySelectorAll('#phrase li');
		//loop iterating through array, i being number of loops
		for (var i = 0; i < liElements.length; i++) {
			if (liElements[i].innerHTML === letter) {
				liElements[i].className = "show letter";
			}
		}
	}
}