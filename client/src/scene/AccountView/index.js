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
import * as modifyActions from './data/modify/actions';
import * as removeActions from './data/remove/actions';
import * as authActions from '../../data/auth/actions';
import Layout from './components/Layout';
import Form from './components/Form';

class AccountView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      const { accountId } = nextProps;
      this.props.accountRequest(accountId);
    }
  }
  handleSubmit = ({ type, data, id }) => {
    if (type === 'modify') {
      this.props.modifyRequest(data, id)
        .then(() => {
          if (this.props.modify.status === 'FAILURE') {
            throw this.props.modify.error;
          } else {
            this.props.noticeDialogOn('수정이 완료되었습니다.');
            this.props.accountRequest(this.props.accountId);
          }
        })
        .catch((error) => {
          this.props.noticeDialogOn(error);
        });
    } else if (type === 'remove') {
      this.props.removeRequest(id)
        .then(() => {
          if (this.props.remove.status === 'FAILURE') {
            throw this.props.remove.error;
          } else {
            this.props.onClose();
            this.props.noticeDialogOn('삭제가 완료되었습니다.');
          }
        })
        .catch((error) => {
          this.props.noticeDialogOn(error);
        });
    }
  };
  render() {
    const {
      open,
      onClose,
      account,
      auth,
      attendanceMode,
    } = this.props;
    return (
      <Layout
        open={open}
        onClose={onClose}
        title="계정 조회"
      >
        {
          account.status === 'SUCCESS' ?
            <Form
              attendanceMode={attendanceMode}
              managerMode={auth.account && auth.account.type === 'manager'}
              account={account.account}
              handleSubmit={this.handleSubmit}
            /> : null
        }
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.data.auth,
  account: state.AccountView.data.account,
  modify: state.AccountView.data.modify,
  remove: state.AccountView.data.remove,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  noticeDialogOn: noticeDialogActions.on,
  accountRequest: accountActions.request,
  authRequest: authActions.request,
  modifyRequest: modifyActions.request,
  removeRequest: removeActions.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountView));
