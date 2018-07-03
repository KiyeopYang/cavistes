import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import Background from '../../components/Background';
import Body from '../../components/ItemBody';
import SignUp from './components/SignUp';
import LoginForm from './components/LoginForm';
import * as accountActions from '../../data/account/actions';
import * as dialog from '../../../../data/noticeDialog/actions';
import loader from '../../../../modules/loader';

class Login extends React.Component {
  toSignUp = () => {
    this.props.changePage(`${this.props.match.path}/signup`);
  };
  handleSignUp = ({ email, password }) => {
    loader(true);
    this.props.makeAccountRequest({ email, password })
      .then((data) => {
        loader(false);
        if (this.props.makeAccount.status === 'SUCCESS') {
          this.props.notice('do login');
          this.props.changePage('/login');
        } else {
          throw data;
        }
      })
      .catch((error) => {
        loader(false);
        this.props.notice('something broken');
      })
  };
  handleLogin = ({ email, password }) => {
    loader(true);
    this.props.loginRequest({ email, password })
      .then((data) => {
        loader(false);
        if (this.props.login.status === 'SUCCESS') {
          this.props.getRequest();
        } else {
          throw data;
        }
      })
      .catch((error) => {
        loader(false);
        console.error(error);
        this.props.notice('something broken');
      })
  };
  render() {
    const { match } = this.props;
    return (
      <Background>
        <Body>
          <Route
            exact
            path={`${match.path}/`}
            render={props =>
              <LoginForm
                {...props}
                toSignUp={this.toSignUp}
                handleLogin={this.handleLogin}
              />
            }
          />
          <Route
            path={`${match.path}/signup`}
            render={props =>
              <SignUp
                {...props}
                handleSignUp={this.handleSignUp}
                goBack={() => this.props.changePage('/login')}
              />
            }
          />
        </Body>
      </Background>
    );
  }
}
const mapStateToProps = state => ({
  makeAccount: state.main.data.account.makeAccount,
  login: state.main.data.account.login,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  notice: dialog.on,
  makeAccountRequest: accountActions.makeAccountRequest,
  loginRequest: accountActions.loginRequest,
  getRequest: accountActions.getRequest,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login));
