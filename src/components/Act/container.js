import Act from './index';
import { connect } from 'react-redux';
import changeMode from '../../actions/changeMode';
import getAnswer from '../../actions/getAnswer';

const mapStateToProps = (state) => {
    const { user, answer } = state;
    return ({
        username: user.username,
        answer,
    });
};

const mapDispatchToProps = (dispatch) => ({
    changeMode: mode => dispatch(changeMode(mode)),
    getAnswer: username => dispatch(getAnswer(username)),
});

const ActContainer = connect(mapStateToProps, mapDispatchToProps)(Act);

export default ActContainer;
