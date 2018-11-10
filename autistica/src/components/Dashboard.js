import React, { Component } from 'react';

import logo from '../logo.svg';
import './Welcome.css';
import { BrowserRouter as Router, Link} from "react-router-dom";
import { Redirect } from 'react-router';


export default class Dashboard extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
         value: '',
      };
    };

    handleChange(event) {
        this.setState({value: event.target.value});
     }
render() {
return (
  <div className="message_wrap" key={this.props.message_id}>
                                <div className="message_body">
                                       {this.props.message_body}
                                </div>            
                                 <div className="input-field col s12">
                                     <textarea value={this.state.value} ref={(ta) => {this.text = ta}}onChange={this.handleChange.bind(this)}/>
                                     <label htmlFor="textarea1">
                                         Ответ
                                     </label>
                                <button onClick={this.props.onClick}>
                                    Отправить
                                </button>
                        </div>
                    </div>
    );
  }

}
