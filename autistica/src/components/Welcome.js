import React, { Component } from 'react';
import Dashboard from './Dashboard.js';
import logo from '../logo.svg';
import './Welcome.css';
import { BrowserRouter as Router, Link, Route} from "react-router-dom";
import { Redirect, Switch} from 'react-router';

const Dashbd = () => <Dashboard />;

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {id: '',
              redirect: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.goToDashboard = this.goToDashboard.bind(this);
  }

  handleChange(event) {
    this.setState({id: event.target.value});
  }

  goToDashboard(event) {
    if (this.state.id === '') {
      alert('Please enter a proper ID.');
      event.preventDefault();
    } else {
      this.setState({redirect: true});
      event.preventDefault();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !this.state.redirect;
  }

  render() {
    let { to } = { to : { pathname: "/dashboard" } };

    if (this.state.redirect) {
      return (
        <Router> 
          <div>
            <Redirect to={to} />
            <Route path='/dashboard' component={Dashbd} push={true} />
          </div>
        </Router>
      )
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          Welcome!!!
          <br/> 
          <p>What's your <code>ID</code>?</p>
          
          <form onSubmit={this.goToDashboard}>
            <label>
              <input type="text" name="name" id={this.state.id} onChange={this.handleChange}/>
            </label>
          </form>

          <div>
            <input type="submit" name="Let's start" onClick={this.goToDashboard}/>
          </div>
    
          <p><a
            className="Autistica Website"
            href="https://www.autistica.org.uk/"
            target="_blank"
            rel="noopener noreferrer"
            color=""
          > Haven't got an <code>ID</code>? Create one now! 
          </a></p>
        </header>
      </div>
    );
  }
}