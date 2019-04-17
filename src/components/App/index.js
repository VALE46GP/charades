import React, { Component } from 'react';
import ControlsContainer from '../Controls/container';
import ResultsContainer from '../Results/container';
import './index.css';
import store from "../../store/store";
import loadWatchlist from "../../actions/loadWatchlist";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibilityFilter: 'SHOW_ALL',
            mode: 'WATCHLIST',
            searchInput: '',
            all: [],
            results: [],
        };
    }

    componentDidMount() {
        store.dispatch(loadWatchlist());
    }

    render() {
        return (
            <div className="App">
                <ControlsContainer />
                <ResultsContainer />
            </div>
        );
    }
}

export default App;