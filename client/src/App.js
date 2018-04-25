import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  withRouter,
  Switch,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'fine-uploader';
import CssBaseline from 'material-ui/CssBaseline';
import { scroller } from 'react-scroll';
import * as cookie from './modules/cookie';
import * as noticeDialogActions from './data/noticeDialog/actions';
import * as authActions from './data/auth/actions';
import loader from './data/loader/actions';
import NoticeDialog from './components/NoticeDialog';
import Header from './components/Header';
import Main from './scene/Main';
import Detail from './scene/Detail';
import Login from './scene/Login';
import SignUp from './scene/SignUp';
import MyInfo from './scene/MyInfo';
import Add from './scene/Add';
import Footer from './components/Footer';
import Loader from './components/Loader';
import AccountManager from './scene/AccountManager';
import loaderDOM from './modules/loader';
import AuthRoute from './modules/AuthRoute';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginModalOpen: false,
      isSignUpModalOpen: false,
      isMyInfoModalOpen: false,
      isAccountManagerModalOpen: false,
    };
    loaderDOM(this.props.loaderState);
    this.props.authRequest();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.loaderState !== nextProps.loaderState) {
      if (nextProps.auth.status === 'WAITING') {
        loaderDOM(true);
      } else {
        loaderDOM(nextProps.loaderState);
      }
    }
  }
  handleLogout = () => {
    cookie.remove('token');
    this.props.authRequest();
  };
  handleUserMenuClick = (label) => {
    if (label === 'myInfo') {
      this.setState({
        isMyInfoModalOpen: true,
      });
    } else if (label === 'logout') {
      this.handleLogout();
    } else if (label === 'accountManager') {
      this.setState({
        isAccountManagerModalOpen: true,
      });
    }
  };
  handleMenuClick = (label) => {
    this.props.push('/');
    setTimeout(() => {
      scroller.scrollTo(label, {
        smooth: true,
        offset: -100,
        duration: 500,
      });
    }, 300);
  };
  render() {
    const {
      isLoginModalOpen,
      isSignUpModalOpen,
      isMyInfoModalOpen,
      isAccountManagerModalOpen,
    } = this.state;
    const {
      noticeDialog,
      auth,
      push,
      loaderState,
    } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Header
          user={auth.account}
          onClick={this.handleMenuClick}
          onClickUserMenu={this.handleUserMenuClick}
          onClickLogin={() => this.setState({
            isLoginModalOpen: true,
          })}
          onClickSignUp={() => this.setState({
            isSignUpModalOpen: true,
          })}
        />
        <Route
          exact
          path="/"
          component={Main}
        />
        <Route
          path="/detail/:id"
          component={Detail}
        />
        <Route
          path="/add"
          component={Add}
        />
        <Footer/>
        <Login
          open={isLoginModalOpen}
          onClose={() => this.setState({
            isLoginModalOpen: false,
          })}
        />
        <SignUp
          open={isSignUpModalOpen}
          onClose={() => this.setState({
            isSignUpModalOpen: false,
          })}
        />
        <MyInfo
          user={auth.account}
          open={isMyInfoModalOpen}
          onClose={() => this.setState({
            isMyInfoModalOpen: false,
          })}
        />
        <AccountManager
          open={isAccountManagerModalOpen}
          onClose={() => this.setState({
            isAccountManagerModalOpen: false,
          })}
        />
        <NoticeDialog
          open={noticeDialog.open}
          onClose={this.props.noticeDialogOff}
          title={noticeDialog.title}
          text={noticeDialog.text}
          onConfirm={noticeDialog.onConfirm}
        />
        {
          loaderState ?
            <Loader /> : null
        }
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  state,
  noticeDialog: state.data.noticeDialog,
  loaderState: state.data.loader,
  auth: state.data.auth,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  noticeDialogOn: noticeDialogActions.on,
  noticeDialogOff: noticeDialogActions.off,
  loader,
  authRequest: authActions.request,
  logout: authActions.logout,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));
