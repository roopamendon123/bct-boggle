import TrieDictionary from "./dictionary";
/** 
 * 
 * This is the TextValidator
 * 
 * To check the entered word is valid string, word is already submitted and valid Word
 * 
 * Taken from the internet (code), but i know, how it is working :-)
 * 
 **/

class TextValidator {
    constructor() {
        this.dictionary = new TrieDictionary();
    }

    init() {
        let self = this
        fetch('./dictionary.txt')
            .then(res => res.text())
            .then(text => {
                text.split("\n").forEach((word) => self.dictionary.insert(word));
            });
    }

    isValidStringInput(word, dices = [], selectedDices = []) {
        if (!word) {
            return true;
        }
        let startingDices = dices.filter((dice) => dice.word === word.charAt(0) || dice.word === "*");
        let isValid = false;

        while (!isValid && startingDices.length > 0) {
            let currentDice = startingDices.shift();
            if (!selectedDices.includes(currentDice)) {
                selectedDices.push(currentDice);
                isValid = this.isValidStringInput(word.substring(1), currentDice.adjecents, selectedDices);
                if (!isValid) {
                    selectedDices.pop();
                }
            }

        }
        return isValid;
    }

    // i have modified this(isWordSubmitted) method, to achieve my requirement

    isWordSubmitted(word, answers = []) {
        if (answers.length > 0) {
            return answers.find((answer, i) => {
                if (Array.isArray(answer.word) && answer.word[i] === word) {
                    return answer.word[i] === word;
                } else {
                    return answer.word === word;
                }
            });
        }
    }

    isValidWord(word) {
        return this.dictionary.find(word);
    }

}

export default TextValidator
