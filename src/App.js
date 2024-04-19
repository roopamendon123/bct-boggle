import React, { Component } from 'react';
import './App.css';
import Game from './components/game/game';
import Home from './components/home/home'
import Friends from './components/friends/friends';


class App extends Component {
  constructor(props) {
    super(props);
    this.pages = [<Game />];
    this.state = {
      currentIdx: 0,
      friendsCount: 1,
    };
    this.nextPage = this.nextPage.bind(this);
    this.friendsPage = this.friendsPage.bind(this);
  }

  nextPage() {
    this.setState({ currentIdx: 1 });
  }

  friendsPage(data) {
    this.setState({ currentIdx: 2, friendsCount: data });
  }

  // navigate to diffent pages, based on the user option
  navigate() {
    if (this.state.currentIdx === 0) {
      return (<Home onClickHandler={this.nextPage} onChangeHandler={this.friendsPage} />);
    } else if (this.state.currentIdx === 1) {
      return (<Game />);
    } else if (this.state.currentIdx === 2) {
      return (<Friends friendsCount={this.state.friendsCount} />);
    }
  }

  render() {
    return (
      <div className="app">
        {this.navigate()}
      </div>
    );
  }
}

export default App;
