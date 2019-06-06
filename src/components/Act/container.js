import Act from './index';
import { connect } from 'react-redux';
import changeMode from '../../actions/changeMode';

// const mapStateToProps = (state) => {
//     const {  } = state;
//     return ({
//     })
// };

const mapDispatchToProps = (dispatch) => ({
    changeMode: mode => dispatch(changeMode(mode)),
});

const ActContainer = connect(null, mapDispatchToProps)(Act);

export default ActContainer;
