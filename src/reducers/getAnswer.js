import * as constants from '../constants/index.js';

const getAnswer = (state = null, action) => {
    switch (action.type) {
        case constants.GET_ANSWER:
            return action.answer || state;
        default:
            return state;
    }
};

export default getAnswer;
