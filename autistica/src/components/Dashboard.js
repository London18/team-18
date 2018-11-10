import React, { Component } from 'react';

import logo from '../logo.svg';
import './Welcome.css';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import { Redirect } from 'react-router';
import Questions from './Questions.js';
import './Dashboard.css';

const Question = () => <Questions />;

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       value: '',
       showQuestions: false,
    };
    this.goToQuestions = this.goToQuestions.bind(this);
  };

  handleChange(event) {
      this.setState({value: event.target.value});
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

    return (
      <div className='Dashboard-header'>
            <button onClick={this.goToQuestions}>
              Start Questions!
            </button>
      </div>
    )
    }

}
