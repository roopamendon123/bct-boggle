import React, { Component } from 'react';
import Boggle from '../../model/game/game';
import GameBoard from '../board/board';
import Timer from '../timer/timer';
import './game.css';

/** 
 * 
 * This is the Game Component/Single Player Component
 * 
 * Consuming Boggle Class, which has generic methods, like _addWord, init, etc...
 * 
 * Timer start and timeout functions
 * 
 **/

class Game extends Component {
    constructor() {
        super();
        this.game = new Boggle();
        this.state = {
            hasStarted: false,
            hasTimeOut: false,
            alphabets: this.game.dices.map((dice) => dice.word.toUpperCase()),
            answers: this.game.answers,
            totalScore: this.game.totalScore,
        };
        this.addWord = this._addWord.bind(this);
        this.startGame = this._startGame.bind(this);
        this.recordTimeOut = this._recordTimeOut.bind(this);
    }

    componentDidMount() {
        this._startGame()
    }

    componentDidUpdate(prevProps, nexProps, snapshot) {
        if (nexProps.alphabets !== this.state.alphabets) {
            this.setState({
                hasStarted: true,
                hasTimeOut: false,
            });
        }
    }

    /* Adding words to the state and score and when press the enter keyboard it will add the words & scrores */
    _addWord(event) {
        if (this.state.hasTimeOut === false && event.keyCode === 13 && event.target.value.length > 0) {
            this.game.addWord(event.target.value);
            this.setState({
                answers: this.game.answers,
                totalScore: this.game.totalScore,
            });
            event.target.value = '';
        }
    }

    /* To check timeout */

    _recordTimeOut() {
        this.setState({
            hasTimeOut: true,
        });
    }

    /* To check started the game and creating the dice/playboard */

    _startGame() {
        this.game.init();
        this.setState({
            alphabets: this.game.dices.map((dice) => dice.word.toUpperCase()),
            hasStarted: false,
            hasTimeOut: false,
            totalScore: this.game.totalScore,
            answers: this.game.answers,
        });
    }

    /* Once the timer ends, show the badges/list of words, it will show only one badge at a time(newly entered word). */

    _renderList() {
        return this.state.answers.map((answer, i) => {
            return this._renderBadge(answer, i);
        });
    }

    /* show the PlayBoard, Timer, TotalScore, once it the timer end, it will show the total scrore, words, replay button.
    and also you can restart the game, by clicking restart button */

    _renderPage() {
        if (this.state.hasTimeOut) {
            return (
                <><div className="wrapper">

                    <div className="totalscore">
                        Total Score: {this.state.totalScore}
                    </div>
                    <div className="totalscore">
                        Number of Words: {this.state.answers.length}
                    </div>
                    {this._renderList()}
                    <input type="button" className="restart" value="Again!" onClick={this.startGame} />
                </div></>
            );
        } else {
            return (
                <div>
                    <div className="wrapper">
                        <div className="totalscore">
                            Total Score: {this.state.totalScore}
                        </div>
                        <input type="button" className="restart" value="Restart" onClick={this.startGame} />
                    </div>
                    <Timer isStarted={this.state.hasStarted}
                        timeLimit={this.game.timeLimit}
                        recordTimeOut={this.recordTimeOut}
                    />

                    <div className="">
                        {this._renderBadge(this.state.answers[this.state.answers.length - 1], 0)}
                        <GameBoard dices={this.state.alphabets}
                            onChangeHandler={this.addWord}
                        />
                    </div>
                </div >
            );
        }
    }

    /* show the badges, when the player enter the words, it will show only one badge at a time(newly entered word). */
    _renderBadge(answer, i) {
        if (answer) {
            return (
                <div className="badge" key={i}>
                    <div>{answer.word}</div>
                    <div className="badgeTip">
                        {answer.score}
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this._renderPage()}
            </div>
        );
    }
}

export default Game;