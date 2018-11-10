import React, { Component } from 'react';
import fire from '../db.js';
import "./Question.css";
//import fire from './fire';
//import './App.css';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import { Redirect } from 'react-router';
import Dashboard from './Dashboard.js';


class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {qs: ['sup?', 'okay?', 'what?', 'how?', 'when?'],
                  ans: [],
                  text: '',
                  point: 0,
                  showDashboard: false};
    this.handleSkip = this.handleSkip.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.goToDashboard = this.goToDashboard.bind(this);
  }

  goToDashboard(event) {
    this.setState({showDashboard: true});
    event.preventDefault();
  }

  handleSkip() {
    this.setState(state => ({
      ans: state.ans.concat('skip'),
      text: ''
    }));
    if(this.state.ans.length >= 4) {
      this.setState(state => ({
        ans: [],
        text: '',
        point: 0,
        showDashboard: true
      }));
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    if(this.state.ans.length >= 4) {
      this.setState(state => ({
        ans: [],
        text: '',
        point: 0,
        showDashboard: true
      }));
    } else {
      this.setState(state => ({
        ans: state.ans.concat(this.state.text),
        text: '',
        point: state.point + 1
      }));
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    if (this.state.showDashboard) {
        return (
          <Router>
            <div>
              <Redirect to={'/dashboard'} />
              <Route path='/dashboard' component={Dashboard} push={true} />
            </div>
          </Router>
        )
      };
    return (
      <div className = "Question">
        <TodoList ans={this.state.ans} point={this.state.point}/>
        <form onSubmit={this.handleSubmit} className = "Question-header">
          <label htmlFor="new-todo">
            Question {this.state.ans.length + 1}: {this.state.qs[this.state.ans.length]}
          </label>
          <br />
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <br />
          <center><button>
            Submit
          </button></center>
          <br />
          <center><button className="Question-button-skip" onClick={this.handleSkip}>
            Skip
          </button></center>
          <br />
          <center><button onClick={this.goToDashboard}>
            Dashboard
          </button></center>
        </form>
      </div>
    );
  }
}

class TodoList extends Component {
  render() {
    return (
      <div>
      <h4> Points = {this.props.point} </h4>

      </div>
    );
  }
}
export default Question;
