import * as constants from '../constants/index.js';

/**
 * change mode ('act' or 'guess')
 *
 * @param {string} mode
 * @returns {object} action
 */
const changeMode = mode => ({
    type: constants.CHANGE_MODE,
    mode,
});

export default changeMode;
