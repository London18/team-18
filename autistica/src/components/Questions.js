import React, { Component } from 'react';
import logo from '../logo.svg';
import './Welcome.css';
import { BrowserRouter as Router, Link} from "react-router-dom";
import { Redirect } from 'react-router';

export default class Questions extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        questions: [(1, "text"), (3, "3"), (4, "5")],
      };
    };

    render() {
        const listItems = this.state.questions.map((item) =>
         <li>{item}</li>
        );

    return (
       <ul>{listItems}</ul>
      )
      }

}

