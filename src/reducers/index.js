import { combineReducers } from 'redux';
import setUser from './setUser';
import changeMode from './changeMode';
import getAnswer from './getAnswer';

const rootReducer = combineReducers({
    user: setUser,
    mode: changeMode,
    answer: getAnswer,
});

export default rootReducer;
