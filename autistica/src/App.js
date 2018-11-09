import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p> Welcome!!! </p>
          <p> What's your <code> ID </code>? </p>
          <p>
            <form>
              <label>
                <input type="text" name="name" />
              </label>
            </form>
          </p>
          <p> <input type="submit" value="Submit" /> </p>
            
        </header>
      </div>
    );
  }
}

export default App;
