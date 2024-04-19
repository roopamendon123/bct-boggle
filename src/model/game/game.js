import Dice from '../dice/dice';
import TextValidator from '../../validator/validator';


/** 
 * 
 * This is the DICE_CONFIG
 * 
 * This can be changed, depends upon the language selection
 * 
 * English is the default.
 * 
 * Language selection is not in place
 *  
 * 
 **/

const DICE_CONFIG = [
  ['d', 'e', 'i', 'l', 'r', 'x'],
  ['h', 'l', 'n', 'n', 'r', 'z'],
  ['d', 'e', 'l', 'r', 'v', 'y'],
  ['e', 'l', 'r', 't', 't', 'y'],
  ['e', 'h', 'r', 't', 'v', 'w'],
  ['e', 'e', 'g', 'h', 'n', 'w'],
  ['a', 'a', 'e', 'e', 'g', 'n'],
  ['a', 'o', 'o', 't', 't', 'w'],
  ['e', 'i', 'o', 's', 's', 't'],
  ['e', 'e', 'i', 'n', 's', 'u'],
  ['d', 'i', 's', 't', 't', 'y'],
  ['a', 'f', 'f', 'k', 'p', 's'],
  ['a', 'c', 'h', 'o', 'p', 's'],
  ['c', 'i', 'm', 'o', 't', 'u'],
  ['h', 'i', 'm', 'n', 'q', 'u'],
  ['a', 'b', 'b', 'j', 'o', 'o'],
];


/** 
 * 
 * This is the Boggle Class
 *  
 * Used to create Dice, validtors, addwords, Score etc..
 * 
 * 'wordListScore', 'multiPlayerScore', 'addWordForFriends', 'friendsWordsPusher' for these methods, i have written the logics
 * 
 * Taken from the internet (code), but i know, how it is working :-)
 *  
 *  
 **/

class Boggle {
  constructor() {
    this.dices = DICE_CONFIG.map((dice) => new Dice(dice));
    this.answers = [];
    this.totalScore = 0;
    this.timeLimit = 180; // 3 minutes
    this.validator = new TextValidator();
    this.validator.init();
    this.friendsAnswers = [];
  }

  init() {
    this.answers = [];
    this.totalScore = 0;
    this._rollDices();
    this._addWildCards(2);
    this._populateBoard();
  }

  /** This method is used to addwords for single player and calculate the scores/totalscores **/

  addWord(word) {
    word = word.toLowerCase();
    if (this.validator.isValidStringInput(word, this.dices) && !this.validator.isWordSubmitted(word, this.answers) && this.validator.isValidWord(word)) {
      this.answers.push({
        word: word,
        score: this.wordListScore(word),
      });
      this.totalScore += this.wordListScore(word);
    }
  }


  /** This method is used to push entry, when the answers count is 0 **/

  friendsWordsPusher(word, id) {
    this.answers.push({
      word: [word],
      id: id
    });
  }

  /** This method is add the answers, for mutiplayer/Playwothfriends mode **/

  addWordForFriends(word, id) {
    word = word.toLowerCase();
    if (this.answers.length === 0 && this.validator.isValidStringInput(word, this.dices) && !this.validator.isWordSubmitted(word, this.answers) && this.validator.isValidWord(word)) {
      this.friendsWordsPusher(word, id);
    } else {
      /* If the entered the person/friend id is present in the list of answers, then add the entered words to the particlular entry */

      this.answers.map((entry) => {
        if (entry.id === id && this.validator.isValidStringInput(word, this.dices) && !this.validator.isWordSubmitted(word, this.answers) && this.validator.isValidWord(word)) {
          entry.word.push(word);
        }
        return entry
      })
    };

    /* If the entered the person/friend id is not present in the list of answers, then push the entry to answers array */

    if (this.answers.filter((answer) => answer.id === id).length === 0 && this.validator.isValidStringInput(word, this.dices) && !this.validator.isWordSubmitted(word, this.answers) && this.validator.isValidWord(word)) {
      this.answers.push({
        word: [word],
        id: id
      });
    };
  }

  /** This method is used to calculated the friends score, this method is called, after the timeout **/

  multiPlayerScore() {
    const wordCounts = new Map();

    /* checking whether, others friends/person is having the same/dublicate word or not, 
    if it same word/dublicate word found, then counting that word */

    this.answers.forEach((obj) => {
      const uniquewords = new Set(obj.word);
      uniquewords.forEach((word) => {
        if (wordCounts.has(word)) {
          wordCounts.set(word, wordCounts.get(word) + 1)
        } else {
          wordCounts.set(word, 1);
        }
      });
    });

    /* Here Calcuting score, based on the above uniquewords */

    this.answers.forEach((obj) => {
      const uniquewords = new Set(obj.word);
      let score = 0;
      uniquewords.forEach((word) => {
        if (wordCounts.get(word) === 1) {
          score += this.wordListScore(word);
        }
      });
      obj.score = score;
    });
    return this.answers;
  }

  /** Generic method is used to calculated score **/

  wordListScore(word) {
    let length = word.length;
    if (length >= 8) {
      return 11;
    } else if (length === 7) {
      return 5;
    } else if (length === 6) {
      return 3;
    } else if (length === 5) {
      return 2;
    } else if (length === 3 || length === 4) {
      return 1;
    } else {
      return 0
    };
  }

  /** Generic method is used to roll the dices **/

  _rollDices() {
    for (let i = 0; i < this.dices.length; i++) {
      let idx = Math.floor(Math.random() * this.dices.length);
      this.dices[i].rollDice();
      this.dices[idx].rollDice();
      let temp = this.dices[idx];
      this.dices[idx] = this.dices[i];
      this.dices[i] = temp;
    }
  }

  /** Generic method is used to populate the board **/

  _populateBoard() {
    this.dices.forEach((dice, currentIdx) => {
      dice.populateAdjacentDices(currentIdx, this.dices);
    });
  }

  /** Generic method is used to add wild cards **/

  _addWildCards(num) {
    while (num > 0) {
      let idx = Math.floor(Math.random() * this.dices.length);
      if (this.dices[idx].word !== "*") {
        this.dices[idx].word = "*";
        num--;
      }
    }
  }
}

export default Boggle;
