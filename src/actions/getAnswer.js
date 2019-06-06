import * as constants from '../constants/index.js';
import axios from "axios";

const getAnswer = username => {
    console.log('USERNAME = ', username);

    return dispatch => {
        axios.get(`game/answers`, {
            params: {
                username,
            }
        })
            .then((res) => {
                console.log('RES.DATA = ', res.data);
                dispatch(getAnswerSuccess(res.data));
            });
    }
};

/**
 * get a random answer from db (one not created by the current user)
 *
 * @param {object} answer
 * @returns {object} action
 */
const getAnswerSuccess = answer => ({
    type: constants.GET_ANSWER,
    answer,
});

export default getAnswer;
