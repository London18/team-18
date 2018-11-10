import React, { Component } from 'react';

import logo from '../logo.svg';
//import './Welcome.css';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import { Redirect } from 'react-router';
import Question from './Question.js';
import Welcome from './Welcome.js'
import './Dashboard.css';

//const Question = () => <Question />;

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       value: '',
       showQuestions: false,
       logout: false,
    };
    this.goToQuestions = this.goToQuestions.bind(this);
    this.goToHomePage = this.goToHomePage.bind(this);
  };

  handleChange(event) {
      this.setState({value: event.target.value});
  }

  goToHomePage(event) {
    this.setState({logout: true});
    event.preventDefault();
  }

  goToQuestions(event) {
        this.setState({showQuestions: true});
        event.preventDefault();
    }

  render() {

    if (this.state.showQuestions) {
        return (
          <Router>
            <div>
              <Redirect to={'/dashboard/questions'} />
              <Route path='/dashboard/questions' component={Question} push={true} />
            </div>
          </Router>
        )
      };
    if (this.state.logout) {
        return (
          <Router>
            <div>
              <Redirect to={'/'} />
              <Route path='/' component={Welcome} push={true} />
            </div>
          </Router>
        )
      };

    return (
      <div className='Dashboard-header'>
            <h4> Welcome {this.props.id} </h4>
            <button onClick={this.goToQuestions}>
              Start Questions!
            </button>
            <br />
            <button onClick={this.goToHomePage}>
              Logout
            </button>
      </div>
    )
    }

}
