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
import * as noticeActions from './data/notice/actions';
import * as authActions from '../../data/auth/actions';
import Layout from './components/Layout';
import Table from './components/Table';
import Title from './components/Title';
import Tools from './components/Tools';
import EditModal from './components/EditModal';

class Notice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditModalOpen: false,
      editModalMode: 'create',
      selected: null,
    };
    this.props.getNoticeRequest();
  }
  handleSubmit = (input) => {
    const { selected, editModalMode } = this.state;
    if (editModalMode === 'create') {
      this.props.addNoticeRequest({
        ...input,
        account: this.props.auth.account,
      })
        .then(() => {
          const { notice, noticeDialogOn, getNoticeRequest } = this.props;
          if (notice.addNotice.status === 'SUCCESS') {
            this.setState({
              isEditModalOpen: false,
            });
            getNoticeRequest();
            noticeDialogOn('생성되었습니다.');
          } else {
            throw notice.addNotice.error;
          }
        })
        .catch(this.props.noticeDialogOn);
    } else if (editModalMode === 'update') {
      this.props.updateNoticeRequest(selected.id, {
        ...input,
      })
        .then(() => {
          const { notice, noticeDialogOn, getNoticeRequest } = this.props;
          if (notice.updateNotice.status === 'SUCCESS') {
            this.setState({
              isEditModalOpen: false,
            });
            getNoticeRequest();
            noticeDialogOn('수정되었습니다.');
          } else {
            throw notice.updateNotice.error;
          }
        })
        .catch(this.props.noticeDialogOn);
    }
  };
  handleRemove = () => {
    const { selected } = this.state;
    this.props.removeNoticeRequest(selected.id)
      .then(() => {
        const { notice, noticeDialogOn, getNoticeRequest } = this.props;
        if (notice.removeNotice.status === 'SUCCESS') {
          this.setState({
            isEditModalOpen: false,
          });
          getNoticeRequest();
          noticeDialogOn('삭제되었습니다.');
        } else {
          throw notice.removeNotice.error;
        }
      })
      .catch(this.props.noticeDialogOn);
  };
  render() {
    const {
      isEditModalOpen,
      editModalMode,
      selected,
    } = this.state;
    const { notice, auth } = this.props;
    const { getNotice } = notice;
    const managerMode = auth.account && auth.account.type === 'manager';
    return (
      <Layout>
        <Title text="공지사항"/>
        {
          managerMode ?
            <Tools onClick={() => this.setState({
              isEditModalOpen: true,
              editModalMode: 'create',
            })}/> : null
        }
        <Table
          handleClick={id => this.setState({
            isEditModalOpen: true,
            editModalMode: managerMode ? 'update' : 'view',
            selected: getNotice.notice.find(o => o.id === id),
          })}
          rows={getNotice.notice.map((o) => {
            const date = new Date(o.datetime);
            return {
              ...o,
              datetime: `${date.getUTCFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}시 ${date.getMinutes()}분`,
            };
          })}
        />
        <EditModal
          open={isEditModalOpen}
          onClose={() => this.setState({ isEditModalOpen: false })}
          selected={selected}
          mode={editModalMode}
          managerMode={managerMode}
          handleSubmit={this.handleSubmit}
          handleRemove={this.handleRemove}
        />
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  notice: state.Notice.data.notice,
  auth: state.data.auth,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  noticeDialogOn: noticeDialogActions.on,
  getNoticeRequest: noticeActions.getNoticeRequest,
  addNoticeRequest: noticeActions.addNoticeRequest,
  updateNoticeRequest: noticeActions.updateNoticeRequest,
  removeNoticeRequest: noticeActions.removeNoticeRequest,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notice));
