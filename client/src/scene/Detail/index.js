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
import ApplicationInfo from './components/ApplicationInfo';
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
      isApplicationInfoModalOpen: false,
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
      status: orderMethod === '무통장입금' ? '입금대기' : '결제완료',
    })
      .then(() => {
        this.props.getEventByIdRequest(getEventById.event.id);
        this.props.noticeDialogOn('신청되었습니다.');
        this.setState({
          isApplicationFormModalOpen: false,
          isApplicationInfoModalOpen: true,
        });
      })
      .catch(console.error);
  };
  handleSubmit = () => {
    const { auth, noticeDialogOn } = this.props;
    if (!auth.account || auth.account.type !== 'default') {
      noticeDialogOn('일반 회원으로 로그인을 해 주십시요.');
    } else if(this.isAlreadySubmitted()) {
      this.setState({
        isApplicationInfoModalOpen: true,
      });
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
      getService,
    } = this.props;
    const {
      isApplicationFormModalOpen,
      isApplicationInfoModalOpen,
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
          account={auth.account}
          open={isApplicationFormModalOpen}
          event={event}
          onSubmit={this.handleAttendanceSubmit}
          onClose={() => this.setState({
            isApplicationFormModalOpen: false,
          })}
        />
        <ApplicationInfo
          open={isApplicationInfoModalOpen}
          event={event}
          info={event.attendees.find(o => o.accountId === auth.account.id)}
          bankAccount={getService.service && getService.service.bankAccount}
          onClose={() => this.setState({
            isApplicationInfoModalOpen: false,
          })}
        />
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.data.auth,
  getService: state.data.service.getService,
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
