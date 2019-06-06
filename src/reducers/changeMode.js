import * as constants from '../constants/index.js';

const changeMode = (state = 'guess', action) => {
    switch (action.type) {
        case constants.CHANGE_MODE:
            return action.mode || state;
        default:
            return state;
    }
};

export default changeMode;
