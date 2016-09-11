import { connect } from 'react-redux';

import LoginComponent from './Login';

import {
    fetchAccessIfNeeded,
    checkSession,
} from '../../actions';

const mapStateToProps = ({ session, authorized }) => ({
    session,
    authorized,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAccessIfNeeded(username, password) { dispatch(fetchAccessIfNeeded(username, password)); },
    checkSession() { dispatch(checkSession()); },
});

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent);

export default LoginContainer;
