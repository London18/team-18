import React, { Component } from 'react';
import fire from '../db.js';
import "./Question.css";
import question_option from './questions_options.js';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import { Redirect } from 'react-router';
import Dashboard from './Dashboard.js';

const ProgressBar = (props) => {
  return (
    <div className="progress-bar">
      <Filler percentage={props.percentage} />
    </div>
  )
}

const Filler = (props) => {
  return <div className="filler" style={{width: `${props.percentage}%`}} />
}

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {qs: [],
                  type: [],
                  ans: [],
                  text: 'Select',
                  point: 0,
                  numQu: 5,
                  qnum: null,
                  showDashboard: false,
                  percentage: 0,
                  };
    this.handleSkip = this.handleSkip.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.goToDashboard = this.goToDashboard.bind(this);
  }

  componentDidMount() {
    var count=0;
    const question_types = fire.database().ref().child('Formats').orderByKey();
    const question_bank = fire.database().ref().child('Questions').orderByKey();

    question_bank.once('value', snapshot => {
      snapshot.forEach(child => {
        this.setState({qs : this.state.qs.concat(child.node_.value_)});
      });
    })

    question_types.once('value', snapshot => {
      snapshot.forEach(child => this.setState({type : this.state.type.concat(child.node_.value_)}));
    })
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
      qnum: Math.floor(Math.random() * (this.state.qs.length)),
      percentage: state.percentage + 100 / state.numQu,
    }));
    if(this.state.ans.length >= 4) {
      this.setState(state => ({
        ans: [],
        text: 'Select',
        point: 0,
        showDashboard: true,
        percentage: state.percentage + 100 / state.numQu,
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
        showDashboard: true,
        percentage: state.percentage + 100 / state.numQu,
      }));
    } else {
      this.setState(state => ({
        ans: state.ans.concat(this.state.text),
        text: 'Select',
        point: state.point + 1,
        qnum: Math.floor(Math.random() * (this.state.qs.length)),
        percentage: state.percentage + 100 / state.numQu,
      }));
    }

    this.forceUpdate();

  }

  handleChange(e) {
    this.setState({ text: e.target.value });
    e.preventDefault();

  }

  render() {
    let answervals, qsdescr;
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
      qsdescr = "Answer Yes or No ";
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
    qsdescr = "Rate on a scale of 0 to 3 ";
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
    qsdescr = "Rate on a scale of 1 to 5 ";
  }
    return (
    <div>
      <div>
       <ProgressBar percentage={this.state.percentage} />
      </div>

      <div className = "Question">
        <TodoList ans={this.state.ans} point={this.state.point}/>
        <form onSubmit={this.handleSubmit} className = "Question-header">
          <label htmlFor="new-todo">
            Question {this.state.ans.length + 1}: {qsdescr}
            <br />
            {this.state.qs[this.state.qnum]}
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
