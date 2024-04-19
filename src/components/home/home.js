import React, { Component } from 'react';
import './home.css';

/** 
 * 
 * This is the Homepage Component
 * 
 *  Click on 'play', Single player is playing, after 3 minutes timer showing score and replay the again.
 * 
 *  Click on 'play with friends', choose the friends count, as of now i have kept 4 friends/players, assuming that room is created for individual player, 
 *  and In the UI, showing the all the player is playing, assume that each card is room, I am calculating scrore at the end of timer, and showing the all players score, words, etc..
 *   
 *  If you reload the page, it will navigate to this page.
 * 
 *  Please use keyboard enter.
 * 
 * 
 **/

class Home extends Component {
    constructor() {
        super();
        this.state = {
            showRadioButton: false,
        };
    }
    render() {
        return (
            <div className='homepage'>
                <img src="logo.png" alt='log' className='image' />
                <input type="button" className='button' value="PLAY!" onClick={this.props.onClickHandler} />
                <input type="submit" className='button' value="PLAY WITH FRIENDS" onClick={() => this.setState({
                    showRadioButton: !this.state.showRadioButton,
                })} />
                {this.state.showRadioButton && (
                    <div>
                        <h6>Choose the Friends</h6>
                        <label>2</label>
                        <input type="radio" name="friends" value="2" onChange={() => this.props.onChangeHandler(2)} />
                        <label>3</label>
                        <input type="radio" name="friends" value="3" onChange={() => this.props.onChangeHandler(3)} />
                        <label>4</label>
                        <input type="radio" name="friends" value="4" onChange={() => this.props.onChangeHandler(4)} />
                    </div>
                )}
            </div>
        );
    }
}

export default Home;