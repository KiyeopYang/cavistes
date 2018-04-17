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
import * as signUpActions from './data/signUp/actions';
import * as authActions from '../../data/auth/actions';
import Layout from './components/Layout';
import Form from './components/Form';
import Terms from './components/Terms';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'terms',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.setState({
        view: 'terms',
      });
    }
  }
  handleSignUp = (data) => {
    this.props.signUpRequest(data)
      .then(() => {
        if (this.props.signUp.status === 'FAILURE') {
          throw this.props.signUp.error;
        } else {
          this.props.noticeDialogOn('가입을 환영합니다.');
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
      noticeDialogOn,
    } = this.props;
    const { view } = this.state;
    return (
      <Layout
        open={open}
        onClose={onClose}
      >
        {
          view === 'terms' ?
            <Terms
              handleNext={() => this.setState({
                view: 'form',
              })}
            /> : <Form
              handleError={noticeDialogOn}
              handleSubmit={this.handleSignUp}
            />
        }
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  signUp: state.SignUp.data.signUp,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  noticeDialogOn: noticeDialogActions.on,
  signUpRequest: signUpActions.request,
  authRequest: authActions.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp));
