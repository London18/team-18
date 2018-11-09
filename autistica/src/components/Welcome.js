import React, { Component } from 'react';
import logo from '../logo.svg';
import './Welcome.css';

export default class Welcome extends Component {
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
          <p> <input type="submit" value="Let's start!" /> </p>
          <a
            className="Autistica Website"
            href="https://www.autistica.org.uk/"
            target="_blank"
            rel="noopener noreferrer"
            color=""
          > Haven't got an <code>ID</code>? Create one now! 
          </a>
        </header>
      </div>
    );
  }
}
