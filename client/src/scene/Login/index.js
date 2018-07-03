import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  withRouter,
  Redirect,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import * as noticeDialogActions from '../../data/noticeDialog/actions';
import * as loginActions from './data/login/actions';
import * as authActions from '../../data/auth/actions';
import Layout from './components/Layout';
import Form from './components/Form';

class Login extends React.Component {
  handleLogin = (data) => {
    this.props.loginRequest(data)
      .then(() => {
        if (this.props.login.status === 'FAILURE') {
          throw this.props.login.error;
        } else {
          this.props.onClose();
          this.props.authRequest();
        }
      })
      .catch((error) => {
        this.props.noticeDialogOn(error);
      })
  };
  render() {
    const {
      open,
      onClose,
    } = this.props;
    return (
      <Form
        open={open}
        onClose={onClose}
        handleSubmit={this.handleLogin}
      />
    );
  }
}
const mapStateToProps = state => ({
  login: state.Login.data.login,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  noticeDialogOn: noticeDialogActions.on,
  loginRequest: loginActions.request,
  authRequest: authActions.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login));
