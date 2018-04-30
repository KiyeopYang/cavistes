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
import * as accountActions from './data/account/actions';
import * as authActions from '../../data/auth/actions';
import Layout from './components/Layout';
import Form from './components/Form';
import Table from './components/Table';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.props.accountRequest()
        .then(() => {
          console.log(this.props.account);
        })
    }
  }
  render() {
    const {
      open,
      onClose,
      account,
    } = this.props;
    const {
      view,
    } = this.state;
    return (
      <Layout
        open={open}
        onClose={onClose}
        title="계정 관리"
      >
        <Table rows={account.accounts}/>
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  account: state.AccountManager.data.account,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  noticeDialogOn: noticeDialogActions.on,
  accountRequest: accountActions.request,
  authRequest: authActions.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login));
