import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  withRouter,
  Redirect,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import {
  getEventByIdRequest,
} from '../../data/event/actions';
import {
  on,
} from '../../data/noticeDialog/actions';
import Content from './components/Content';
import Front from './components/Front';
import Layout from './components/Layout';
import Title from './components/Title';
import Submit from './components/Submit';
import ApplicationForm from './components/ApplicationForm';
import {
  addReplyRequest,
  removeReplyRequest,
} from './data/reply/actions';
import {
  addAttendanceRequest,
} from './data/attendance/actions';
import * as noticeDialogActions from '../../data/noticeDialog/actions';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isApplicationFormModalOpen: false,
    };
    const { match } = this.props;
    if (match.params.id) {
      this.props.getEventByIdRequest(match.params.id)
    }
  }
  handleReplySubmit = (value) => {
    const { auth, getEventById } = this.props;
    const obj = {
      accountId: auth.account.id,
      eventId: getEventById.event.id,
      email: auth.account.email,
      name: auth.account.name,
      text: value,
    };
    this.props.addReplyRequest(obj)
      .then(() => {
        this.props.getEventByIdRequest(getEventById.event.id);
      })
      .catch(console.error);
  };
  handleReplyRemove = (replyId,) => {
    const { getEventById } = this.props;
    const obj = {
      eventId: getEventById.event.id,
      replyId,
    };
    this.props.removeReplyRequest(obj)
      .then(() => {
        this.props.getEventByIdRequest(getEventById.event.id);
      })
      .catch(console.error);
  };
  handleAttendanceSubmit = (input) => {
    const { auth, getEventById } = this.props;
    const { account } = auth;
    const { event } = getEventById;
    const { orderMethod } = input;
    this.props.addAttendanceRequest({
      accountId: account.id,
      eventId: event.id,
      price: event.price,
      orderMethod,
    })
      .then(() => {
        this.props.getEventByIdRequest(getEventById.event.id);
        this.props.noticeDialogOn('신청되었습니다.');
      })
      .catch(console.error);
  };
  handleSubmit = () => {
    const { auth, noticeDialogOn } = this.props;
    if (!auth.account || auth.account.type !== 'default') {
      noticeDialogOn('일반 회원으로 로그인을 해 주십시요.');
    } else if(this.isAlreadySubmitted()) {
      noticeDialogOn('이미 신청되었습니다. 상단의 이메일을 클릭하여 세부 사항을 확인 해 주십시요.');
    } else {
      this.setState({
        isApplicationFormModalOpen: true,
      });
    }
  };
  isAlreadySubmitted = () => {
    const { auth, getEventById } = this.props;
    return !!(auth.account && getEventById.event &&
      getEventById.event.attendees.findIndex(o => o.accountId === auth.account.id) > -1);
  };
  render() {
    const {
      auth,
      getEventById,
    } = this.props;
    const {
      isApplicationFormModalOpen,
    } = this.state;
    const { event } = getEventById;
    if (!event) return null;
    else {
      event.datetimes = event.datetimes.map(o => new Date(o));
    }
    return (
      <Fragment>
        <Layout>
          <Front
            images={event.images}
          />
          <Title
            event={event}
          />
          <hr />
          <Content
            event={event}
            handleReplySubmit={this.handleReplySubmit}
            handleReplyRemove={this.handleReplyRemove}
            account={auth.account}
          />
        </Layout>
        {
          <Submit
            alreadySubmitted={this.isAlreadySubmitted()}
            onSubmit={this.handleSubmit}
          />
        }
        <ApplicationForm
          open={isApplicationFormModalOpen}
          event={event}
          onSubmit={this.handleAttendanceSubmit}
          onClose={() => this.setState({
            isApplicationFormModalOpen: false,
          })}
        />
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.data.auth,
  getEventById: state.data.event.getEventById,
  addReply: state.Detail.data.reply.addReply,
  removeReply: state.Detail.data.reply.removeReply,
  addAttendance: state.Detail.data.attendance.addAttendance,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  noticeDialogOn: on,
  getEventByIdRequest,
  addReplyRequest,
  removeReplyRequest,
  addAttendanceRequest,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail));
