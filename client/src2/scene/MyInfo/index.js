import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  withRouter,
  Redirect,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import Layout from './components/Layout';
import Form from './components/Form';
import Exit from './components/Exit';
import * as noticeDialogActions from '../../data/noticeDialog/actions';
import * as authActions from '../../data/auth/actions';
import * as modifyActions from './data/modify/actions';
import * as removeActions from './data/remove/actions';

class MyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExitModalOpen: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.setState({
        isExitModalOpen: false,
      });
    }
  }
  handleModify = (data) => {
    this.props.modifyRequest(data, this.props.auth.account.id)
      .then(() => {
        if (this.props.modify.status === 'FAILURE') {
          throw this.props.modify.error;
        } else {
          this.props.noticeDialogOn('수정이 완료되었습니다.');
          this.props.onClose();
          this.props.authRequest();
        }
      })
      .catch((error) => {
        this.props.noticeDialogOn(error);
      });
  };
  handleRemove = () => {
    this.props.removeRequest(this.props.auth.account.id)
      .then(() => {
        if (this.props.remove.status === 'FAILURE') {
          throw this.props.remove.error;
        } else {
          this.props.noticeDialogOn('삭제가 완료되었습니다.');
          this.props.onClose();
          this.props.authRequest();
        }
      })
      .catch((error) => {
        this.props.noticeDialogOn(error);
      });
  };
  render() {
    const {
      open,
      onClose,
      user,
      noticeDialogOn,
    } = this.props;
    const {
      isExitModalOpen,
    } = this.state;
    return (
      <Layout
        open={open}
        onClose={onClose}
      >
        <Form
          user={user}
          handleError={noticeDialogOn}
          handleExit={() => this.setState({
            isExitModalOpen: true,
          })}
          handleModify={this.handleModify}
        />
        <Layout
          open={isExitModalOpen}
          onClose={() => this.setState({
            isExitModalOpen: false,
          })}
        >
          <Exit
            handleRemove={this.handleRemove}
          />
        </Layout>
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.data.auth,
  modify: state.MyInfo.data.modify,
  remove: state.MyInfo.data.remove,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  noticeDialogOn: noticeDialogActions.on,
  modifyRequest: modifyActions.request,
  removeRequest: removeActions.request,
  authRequest: authActions.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyInfo));
