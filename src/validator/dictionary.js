/** 
 * 
 * This is the Dictionary
 * 
 * Used to insert and find the words
 * 
 * Taken from the internet (code), but i know, how it is working :-)
 * 
 **/

class Node {
    constructor(word = '') {
        this.word = word;
        this.isCompleteString = false;
        this.children = {}
    }
}

class TrieDictionary {
    constructor() {
        this.rootNode = new Node();
    }

    insert(word) {
        let node = this.rootNode;

        for (let i = 0; i < word.length; i++) {
            let currentLetter = word[i];

            if (!node.children[currentLetter]) {
                node.children[currentLetter] = new Node(word[i])
            }
            node = node.children[currentLetter];

            if (i === word.length - 1) {
                node.isCompleteString = true;
            }
        }
    }

    find(word) {
        let node = this.rootNode;

        for (let i = 0; i < word.length; i++) {
            let currentLetter = word[i];
            if (!node.children[currentLetter]) {
                return false;
            }
            node = node.children[currentLetter];

            if (i === word.length - 1) {
                return node.isCompleteString;
            }
        }
    }
}

export default TrieDictionary;
