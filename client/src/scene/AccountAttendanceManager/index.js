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
  getAccountAttendanceRequest
} from './data/attendance/actions';
import Layout from './components/Layout';
import Table from './components/Table';
import {animateScroll} from 'react-scroll/modules/index';

class AccountAttendanceManager extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.props.getAccountAttendanceRequest(this.props.auth.account.id)
        .then(() => {
          if (this.props.getAccountAttendance.status === 'FAILURE') {
            throw this.props.getAccountAttendance.error;
          }
        })
        .catch((error) => {
          this.props.noticeDialogOn(error);
        });
    }
  }
  handleEventClick = (attendanceId) => {
    const attendance = this.props.getAccountAttendance.attendance.find(
      o => o.id === attendanceId
    );
    animateScroll.scrollToTop({
      smooth: false,
      duration: 0,
    });
    this.props.onClose();
    console.log(attendance);
    console.log(this.props);
    this.props.push(`/detail/${attendance.eventId._id}`);
  };
  render() {
    const {
      open,
      onClose,
      getAccountAttendance,
    } = this.props;
    return (
      <Layout
        open={open}
        onClose={onClose}
        title="참여 내역"
      >
        <Table
          handleClick={this.handleEventClick}
          rows={getAccountAttendance.attendance.map((o) => {
            const date = new Date(o.eventId.datetimes[0]);
            const len = o.eventId.datetimes.length;
            return {
              title: o.eventId.title,
              datetime: `${date.getUTCFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}시 ${date.getMinutes()}분 (${len}회)`,
              price: o.eventId.price,
              orderMethod: o.orderMethod,
              status: o.status,
              ...o,
            }
          })}
        />
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.data.auth,
  getAccountAttendance: state.AccountAttendanceManager.data.attendance.getAccountAttendance,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  noticeDialogOn: noticeDialogActions.on,
  getAccountAttendanceRequest,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountAttendanceManager));
