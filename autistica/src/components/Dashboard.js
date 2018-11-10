import React, { Component } from 'react';

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
            <div>Test</div>
        );
    }
}
