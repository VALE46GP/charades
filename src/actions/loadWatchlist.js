import * as constants from '../constants/watchlist';
import axios from "axios";

/**
 * loads initial results (the currently displayed watchlist) when App component mounts
 *
 * @returns {object} action
 */
const loadWatchlist = () => {
    return dispatch => {
        axios.get('/watchlist')
            .then((response) => {
                console.log('results from axios request: ', response);
                dispatch(loadWatchlistSuccess(response.data.results));
            })
            .catch(err => {
                console.log('error: ', err);
            });
    }
};

const loadWatchlistSuccess = results => ({
    type: constants.LOAD_WATCHLIST,
    results,
});

// const loadWatchlistStarted = () => ({
//     type: LOAD_WATCHLIST_STARTED
// });

// const loadWatchlistFailure = error => ({
//     type: LOAD_WATCHLIST_FAILURE,
//     payload: {
//         error
//     }
// });

export default loadWatchlist;
