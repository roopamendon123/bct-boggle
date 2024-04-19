import React, { Component } from 'react';
import './timer.css';

/** 
 * 
 * This is the Timer Component
 *  
 * Used to set the timer, record the timer and clear intervals
 * 
 *  Taken from the internet (code), but i know, how it is working :-)
 * 
 **/

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.timeLimit,
    };
  }

  componentDidUpdate(prevProps, nextProps, snapshot) {
    if (!prevProps.isStarted && this.props.isStarted) {
      this.setState({ time: this.props.timeLimit });
      this._setTimer();
    } else if (prevProps.isStarted && !this.props.isStarted) {
      clearInterval(this.timer);
    }
  }

  _setTimer() {
    let self = this;
    if (self.props.isStarted === true) {
      self.timer = setInterval(() => {
        let time = self.state.time - 1;
        if (time === 0) {
          clearInterval(self.timer);
          self.props.recordTimeOut();
        } else {
          self.setState({
            time: time,
          });
        }
      }, 1000);
    }
  }

  _getSeconds() {
    let second = Math.floor(this.state.time % 60).toString();
    second = (second.length === 1) ? '0' + second : second;
    return second;
  }

  _getMinutes() {
    let minutes = Math.floor(this.state.time / 60).toString();
    minutes = (minutes.length === 1) ? '0' + minutes : minutes;
    return minutes;
  }

  render() {
    return (
      <div className="timer">
        <div className="minutes">
          {this._getMinutes()}
        </div>
        <div className="seperator">:</div>
        <div className="second">
          {this._getSeconds()}
        </div>
      </div>
    );
  }
}

export default Timer;
