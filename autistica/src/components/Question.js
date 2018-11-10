import React, { Component } from 'react';
import fire from '../db.js';
import "./Question.css";
import question_text from  './questions_text.js';
import question_options from  './questions_options.js';
//import fire from './fire';
//import './App.css';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import { Redirect } from 'react-router';
import Dashboard from './Dashboard.js';


class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {qs: question_text,
                  type: question_options,
                  ans: [],
                  text: 'Select',
                  point: 0,
                  qnum: null,
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

  handleSkip(e) {
    e.preventDefault();
    this.setState(state => ({
      ans: state.ans.concat('skip'),
      text: '',
      qnum: Math.floor(Math.random() * (this.state.qs.length))
    }));
    if(this.state.ans.length >= 4) {
      this.setState(state => ({
        ans: [],
        text: 'Select',
        point: 0,
        showDashboard: true
      }));
    };

  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text == 'Select') {
      return;
    }
    if(this.state.ans.length >= 4) {
      this.setState(state => ({
        ans: [],
        text: 'Select',
        point: 0,
        showDashboard: true
      }));
    } else {
      this.setState(state => ({
        ans: state.ans.concat(this.state.text),
        text: 'Select',
        point: state.point + 1,
        qnum: Math.floor(Math.random() * (this.state.qs.length))
      }));
    }

    this.forceUpdate();

  }

  // forceUpdate() {
  //   this.render();
  // }

  handleChange(e) {
    this.setState({ text: e.target.value });
    e.preventDefault();

  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return false;
  // }

  render() {
    let answervals;
    if(this.state.qnum == null){
      this.state.qnum = Math.floor(Math.random() * (this.state.qs.length));
    }


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
    if(this.state.type[this.state.qnum] == "yes_no") {
      answervals =  (<div>
    	 <select id='answer' onChange={this.handleChange}
       value={this.state.text}>
       <option value="Select">Select Option</option>
      <option value="yes">yes</option>
      <option value="no">no</option>
    </select>
    	</div>);
    } else if (this.state.type[this.state.qnum] == "scale_0_to_3") {
      answervals = (<div>
  	 <select id='answer' onChange={this.handleChange}
     value={this.state.text}>
     <option value="Select">Select Option</option>
    <option value="0">0</option>
    <option value="1">1</option>
      <option value="2">2</option>
    <option value="3">3</option>

  </select>
  	</div>);
  } else {
    answervals = (<div>
  	 <select id='answer' onChange={this.handleChange}
     value={this.state.text}>
     <option value="Select">Select Option</option>
    <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  </select>
  	</div>);
  }
    return (
      <div className = "Question">
        <TodoList ans={this.state.ans} point={this.state.point}/>
        <form onSubmit={this.handleSubmit} className = "Question-header">
          <label htmlFor="new-todo">
            Question {this.state.ans.length + 1}: {this.state.qs[this.state.qnum]}
          </label>
          <br />

          {answervals}
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
