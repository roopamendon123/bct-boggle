/** 
 * 
 * This is the Dice Class
 *  
 * Used to populate Adjacent Dices and roll dices
 * 
 *  Taken from the internet (code), but i know, how it is working :-)
 *  * 
 **/

class Dice {
    constructor(letters = []) {
        this.word = letters[0];
        this.letters = letters;
        this.adjecents = [];
    }

    populateAdjacentDices(currentIdx, array = []) {
        let target_indexes = [-5, -4, -3, -1, 1, 3, 4, 5];
        if (currentIdx % 4 === 0) {
            target_indexes = [-4, -3, 1, 4, 5];
        } else if (currentIdx % 4 === 3) {
            target_indexes = [-5, -4, -1, 3, 4];
        }
        this.adjecents = target_indexes.reduce((acc, idx) => {
            idx = currentIdx + idx;
            if ((idx >= 0 || idx <= 12) && array[idx]) {
                acc.push(array[idx])
            }
            return acc;
        }, []);
    }

    rollDice() {
        let idx = Math.floor(Math.random() * this.letters.length);
        this.word = this.letters[idx];
    }

}

export default Dice;
