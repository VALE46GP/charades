import Guess from './index';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    const { user } = state;
    return ({
        user,
    })
};

// const mapDispatchToProps = (dispatch) => {
//     return ({
//     });
// };

const GuessContainer = connect(mapStateToProps, null)(Guess);

export default GuessContainer;
