import Guess from './index';
import { connect } from 'react-redux';
import changeMode from '../../actions/changeMode';

const mapStateToProps = (state) => {
    const { user } = state;
    return ({
        user,
    })
};

const mapDispatchToProps = (dispatch) => ({
    changeMode: mode => dispatch(changeMode(mode)),
});

const GuessContainer = connect(mapStateToProps, mapDispatchToProps)(Guess);

export default GuessContainer;
