import React, { Component } from 'react';
import Boggle from '../../model/game/game';
import GameBoard from '../board/board';
import Timer from '../timer/timer';
import './friends.css';

/** 
 * 
 * This component is for Mutipleplayer/friends
 * 
 * Consuming Boggle Class, which has generic methods like init, addWordForFriends, multiPlayerScore etc...
 * 
 * Timer start and timeout functions
 * 
 * Click on 'play with friends', choose the friends count, as of now i have kept 4 friends/players, assuming that room is created for individual player, 
 *  and In the UI, showing the all the player is playing, assume that each card is room, I am calculating scrore at the end of timer, and showing the all players score, words, etc..
 *   
 * If you reload the page, it will navigate to this page.
 * 
 * Please use keyboard enter.
 * 
 **/

class Friends extends Component {
    constructor() {
        super();
        this.game = new Boggle();
        this.state = {
            hasStarted: false,
            hasTimeOut: false,
            alphabets: this.game.dices.map((dice) => dice.word.toUpperCase()),
            answers: this.game.answers,
            personId: 1,
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

    _addWord(event) {
        if (this.state.hasTimeOut === false && event.keyCode === 13 && event.target.value.length > 0) {
            this.game.addWordForFriends(event.target.value, event.target.id);
            this.setState({
                answers: this.game.answers,
                personId: event.target.id
            });
            event.target.value = '';
        }
    }

    _recordTimeOut() {
        this.setState({
            hasTimeOut: true,
        });
        this.game.multiPlayerScore();
    }

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

    _renderPage() {
        let newfriendsCount = [];
        for (let i = 1; i <= this.props.friendsCount; i++) {
            newfriendsCount.push(i);
        }

        if (this.state.hasTimeOut) {
            return (
                this.state.answers.length > 0 ?
                    this.state.answers.map((entry, i) => {
                        return (<div className="wrapper" key={`Answers-${i}`}>
                            <div><b>Person : {entry.id}</b></div>
                            <div className="totalscore">
                                Total Score: {entry.score}
                            </div>
                            <div className="totalscore">
                                Number of Words: {entry.word.length}
                            </div>
                            <div>
                                <div className="totalscore">Words:-</div>
                                {entry.word.map((entry, i) => {
                                    return <div className="totalscore" key={`Score-${i}`}>
                                        {entry}
                                    </div>
                                })}</div>

                            <input type="button" className="restart" value="Again!" onClick={this.startGame} />
                        </div>)
                    }) : <>
                        <div className="wrapper" >
                            <div>No words are entered</div>
                            <input type="button" className="restart" value="Again!" onClick={this.startGame} />
                        </div>
                    </>);
        } else {
            return newfriendsCount.map((entry) => {
                return <div className='friends-wrapper' key={entry} id={`Person-${entry}`}>
                    <div className='wrapper'>
                        <div><b>Person : {entry}</b></div>
                        <input type="button" className="restart" value="Restart" onClick={this.startGame} />
                    </div>
                    <Timer isStarted={this.state.hasStarted}
                        timeLimit={this.game.timeLimit}
                        recordTimeOut={this.recordTimeOut}
                    />
                    <GameBoard dices={this.state.alphabets} personKey={entry}
                        onChangeHandler={this.addWord}
                    />
                </div>
            });
        }
    }

    render() {
        return (
            <>
                {this._renderPage()}
            </>
        );
    }
}

export default Friends;