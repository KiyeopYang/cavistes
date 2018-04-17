import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  withRouter,
  Redirect,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import * as noticeDialogActions from '../../../../data/noticeDialog/actions';
import * as authActions from '../../../../data/auth/actions';
import Layout from './components/Layout';
import Form from './components/Form';
import Bank from './components/Bank';

class ApplicationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'form',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.setState({ view: 'form' })
    }
  }
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
      auth,
    } = this.props;
    const {
      view,
    } = this.state;
    return (
      <Layout
        open={open}
        onClose={onClose}
        title="신청하기"
      >
        {
          view === 'form' ?
            <Form
              user={auth.account}
              handleNext={() => this.setState({
                view: 'bank',
              })}
            /> : <Bank onSubmit={onClose} />
        }
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.data.auth,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  noticeDialogOn: noticeDialogActions.on,
  authRequest: authActions.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplicationForm));
