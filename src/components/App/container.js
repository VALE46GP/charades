import App from './index';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    const { user, mode } = state;
    return ({
        user,
        mode,
    });
};

// const mapDispatchToProps = (dispatch) => ({
// });

const AppContainer = connect(mapStateToProps, null)(App);


export default AppContainer;
