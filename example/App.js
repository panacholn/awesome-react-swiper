import React, { Component } from 'react';
// import Swiper from '../src/swiper';
import Swiper from '../lib/index';
import '../lib/index.css';
import './App.css';

class App extends Component {
  render() {
    let params = {
      // autoPlay: false
    }
    return (
      <div className="App">
          <h1>Awesome-React-Swiper</h1>
          <Swiper {...params}>
            <div className="one">1</div>
            <div className="two">2</div>
            <div className="three">3</div>
          </Swiper>
          <h1>请在手机端查看</h1>
      </div>
    );
  }
}

export default App;
