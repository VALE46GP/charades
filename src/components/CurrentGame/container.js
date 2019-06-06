import CurrentGame from './index';
import { connect } from 'react-redux';

// const mapStateToProps = (state) => {
//     const {  } = state;
//     return ({
//     })
// };

// const mapDispatchToProps = (dispatch) => {
//     return ({
//     });
// };

const CurrentGameContainer = connect(null, null)(CurrentGame);

export default CurrentGameContainer;
