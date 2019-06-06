import React, { Component } from 'react';
import ControlsContainer from '../Navigation/container';
import ActContainer from '../Act/container';
import GuessContainer from '../Guess/container';
import LoginContainer from '../Login/container';
import './index.css';

class App extends Component {

    componentDidMount() {
    }

    render() {
        const { user, mode } = this.props;
        let content;

        if (user && mode === 'guess') {
            content = (
                <GuessContainer />
            );
        } else if (user && mode === 'act') {
            content = (
                <ActContainer />
            );
        } else {
            content = (
                <LoginContainer
                    show={!user}
                />
            );
        }

        return (
            <div className="App">
                <ControlsContainer />
                <div className="bg"></div>
                <div className="bg bg2"></div>
                <div className="bg bg3"></div>
                <div className="content">
                    {content}
                </div>
            </div>
        )
    }
}

export default App;
