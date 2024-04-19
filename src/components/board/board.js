import React, { Component } from 'react';
import './board.css';

/** 
 * 
 * This is the Board Component
 * 
 * Generate the rows and dices
 * 
 * Alsso it has input field, which used to enter the words,
 * 
 * Please use keyboard 'enter', to enter the words
 *  * 
 **/

class GameBoard extends Component {
    _renderDices(dices) {
        return dices.map((dice, index) => {
            let key = `${dice.word}-${index}`
            return <div className="tile" key={key}>{dice}</div>;
        });
    }

    _renderRows() {
        let rows = [];
        for (let i = 0; i < 4; i++) {
            let targetDices = this.props.dices.slice(i * 4, i * 4 + 4);
            rows.push(targetDices);
        }
        return rows.map((row, index) => {
            let key = `diceRow-${index}`;
            return (
                <div className="diceRow" key={key}>
                    {this._renderDices(row)}
                </div>
            );
        });
    }

    render() {
        return (
            <div className="gameBoard">
                <div className="diceHolder">
                    {this._renderRows()}
                </div>
                <input type="text" name="word"
                    autoComplete="off"
                    className="enteredword"
                    placeholder="Your Word"
                    id={this.props.personKey}
                    onKeyDown={this.props.onChangeHandler} />
            </div>
        );
    }
}

export default GameBoard;
