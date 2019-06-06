import { combineReducers } from 'redux';
import setUser from './setUser';
import changeMode from './changeMode';

const rootReducer = combineReducers({
    user: setUser,
    mode: changeMode,
});

export default rootReducer;
