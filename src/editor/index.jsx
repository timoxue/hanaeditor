import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';

class MainWindow extends Component {
    constructor(props, context) {
        super(props, context)
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <h1>This is from main window default</h1>
        )
    }
}

export default MainWindow