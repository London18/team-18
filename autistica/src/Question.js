import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {qs: ['sup?', 'okay?', 'what?', 'how?', 'when?'], ans: [], text: '', point: 0};
    this.handleSkip = this.handleSkip.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
        point: 0
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
        point: 0
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
    return (
      <div>
        <TodoList ans={this.state.ans} point={this.state.point}/>
        <form onSubmit={this.handleSubmit}>
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
          <center><button onClick={this.handleSkip}>
            Skip
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
      <ul>
        {this.props.ans.map((item, i) => (
          <li>{item}</li>
        ))}
      </ul>
      </div>
    );
  }
}
export default Question;
