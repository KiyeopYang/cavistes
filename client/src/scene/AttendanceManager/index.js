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
import {
  getAttendanceRequest,
  updateAttendanceRequest,
} from './data/attendance/actions';
import Layout from './components/Layout';
import Table from './components/Table';
import AccountView from '../AccountView';

class AttendanceManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAccountViewModalOpen: false,
      clickedAccountId: null,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.props.getAttendanceRequest(this.props.eventId)
        .then(() => {
          if (this.props.getAttendance.status === 'FAILURE') {
            throw this.props.getAttendance.error;
          }
        })
        .catch((error) => {
          this.props.noticeDialogOn(error);
        });
    }
  }
  handleAccountClick = (attendanceId) => {
    const clickedAccountId =
      this.props.getAttendance.attendance.find(o => o.id === attendanceId).accountId._id;
    this.setState({
      isAccountViewModalOpen: true,
      clickedAccountId,
    });
  };
  handleUpdateAttendance = ({ id, status }) => {
    this.props.updateAttendanceRequest({ id, status, eventId: this.props.eventId });
  };
  render() {
    const {
      open,
      onClose,
      getAttendance,
    } = this.props;
    const {
      isAccountViewModalOpen,
      clickedAccountId,
    } = this.state;
    return (
      <Layout
        open={open}
        onClose={onClose}
        title="신청 인원 보기"
      >
        <Table
          rows={getAttendance.attendance}
          handleClick={this.handleAccountClick}
          handleUpdate={this.handleUpdateAttendance}
        />
        <AccountView
          open={isAccountViewModalOpen}
          onClose={() => this.setState({
            isAccountViewModalOpen: false,
            clickedAccountId: null,
          })}
          accountId={clickedAccountId}
          attendanceMode
        />
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.data.auth,
  getAttendance: state.AttendanceManager.data.attendance.getAttendance,
  updateAttendance: state.AttendanceManager.data.attendance.updateAttendance,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  noticeDialogOn: noticeDialogActions.on,
  getAttendanceRequest,
  updateAttendanceRequest,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AttendanceManager));
