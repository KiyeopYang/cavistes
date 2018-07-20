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
import * as passwordFindActions from './data/passwordFind/actions';
import * as authActions from '../../data/auth/actions';
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
  handlePasswordFind = (email) => {
    this.props.passwordFindRequest({ email })
      .then(() => {
        if (this.props.passwordFind.status === 'FAILURE') {
          throw this.props.passwordFind.error;
        } else {
          this.props.noticeDialogOn({ text: '이메일로 임시 비밀번호가 발급되었습니다.' });
          this.props.onClose();
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
        handlePasswordFind={this.handlePasswordFind}
        handleSubmit={this.handleLogin}
      />
    );
  }
}
const mapStateToProps = state => ({
  login: state.Login.data.login,
  passwordFind: state.Login.data.passwordFind,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  noticeDialogOn: noticeDialogActions.on,
  loginRequest: loginActions.request,
  passwordFindRequest: passwordFindActions.request,
  authRequest: authActions.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login));
