import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  withRouter,
  Switch,
} from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CssBaseline from 'material-ui/CssBaseline';
import * as noticeDialogActions from './data/noticeDialog/actions';
import * as authActions from './data/auth/actions';
import loader from './data/loader/actions';
import NoticeDialog from './components/NoticeDialog';
import Header from './components/Header';
import Main from './scene/Main';
import Detail from './scene/Detail';
import Login from './scene/Login';
import SignUp from './scene/SignUp';
import Footer from './components/Footer';
import loaderDOM from './modules/loader';
import AuthRoute from './modules/AuthRoute';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginModalOpen: false,
      isSignUpModalOpen: false,
    };
    loaderDOM(this.props.loaderState);
    this.props.authRequest()
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
  render() {
    const {
      isLoginModalOpen,
      isSignUpModalOpen,
    } = this.state;
    const { noticeDialog, auth } = this.props;
    const user = {
      email: 'kiyeopyang@uwhattt.com',
    };
    return (
      <React.Fragment>
        <CssBaseline />
        <Header
          user={null}
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
          path="/detail"
          component={Detail}
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
        <NoticeDialog
          open={noticeDialog.open}
          onClose={this.props.noticeDialogOff}
          title={noticeDialog.title}
          text={noticeDialog.text}
          onConfirm={noticeDialog.onConfirm}
        />
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
