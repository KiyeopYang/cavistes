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
import OwnerButtons from './components/OwnerButtons';
import RemoveModal from './components/RemoveModal';
import UpdateModal from './components/UpdateModal';
import AttendanceManager from '../AttendanceManager';
import {
  addReplyRequest,
  removeReplyRequest,
} from './data/reply/actions';
import {
  addAttendanceRequest,
  removeAttendanceRequest,
} from './data/attendance/actions';
import * as eventActions from '../../data/event/actions';
import * as noticeDialogActions from '../../data/noticeDialog/actions';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isApplicationFormModalOpen: false,
      isApplicationInfoModalOpen: false,
      isAttendanceManagerModalOpen: false,
      isRemoveModalOpen: false,
      isUpdateModalOpen: false,
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
    const { orderMethod, name, phone, } = input;
    this.props.addAttendanceRequest({
      accountId: account.id,
      eventId: event.id,
      price: event.price,
      orderMethod,
      name: account.name,
      nameForPayment: name,
      phone,
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
  handleAttendanceRemove = () => {
    const { getEventById, auth } = this.props;
    const { event } = getEventById;
    this.props.removeAttendanceRequest(event.attendees.find(o => o.accountId === auth.account.id)._id)
      .then(() => {
        this.props.getEventByIdRequest(event.id);
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
  isOwner = () => {
    const { auth, getEventById } = this.props;
    const { account } = auth;
    const { event } = getEventById;
    return account && event && (account.type === 'manager' || (account.type === 'sponsor' && account.id === event.sponsor.id));
  };
  openAttendanceManager = () => {
    this.setState({
      isAttendanceManagerModalOpen: true,
    });
  };
  handleUpdate = (input) => {
    const { getEventById, noticeDialogOn, auth } = this.props;
    const { event } = getEventById;
    input.sponsor.id = auth.account && auth.account.id;
    this.props.updateEventRequest(event.id, input)
      .then(() => {
        noticeDialogOn('수정되었습니다.');
        this.setState({
          isUpdateModalOpen: false,
        });
        this.props.getEventByIdRequest(event.id);
      })
      .catch(console.error);
  };
  handleRemove = () => {
    const { getEventById, auth } = this.props;
    const { event } = getEventById;
    this.props.updateEventRequest(event.id, {
      removed: true,
    })
      .then(() => {
        this.props.push('/');
      })
      .catch(console.error);
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
      isAttendanceManagerModalOpen,
      isRemoveModalOpen,
      isUpdateModalOpen,
    } = this.state;
    const { event } = getEventById;
    console.log(event);
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
          {
            this.isOwner() ?
              <OwnerButtons
                onClick={v => v === 'remove' ? this.setState({
                  isRemoveModalOpen: true,
                }) : this.setState({
                  isUpdateModalOpen: true,
                })}
              /> : null
          }
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
          this.isOwner() ?
            <Submit
              attendanceManagerMode
              onSubmit={this.openAttendanceManager}
            /> : new Date().getTime() - new Date(event.datetimes[0]).getTime() < 0 ?
            <Submit
              alreadySubmitted={this.isAlreadySubmitted()}
              onSubmit={this.handleSubmit}
            /> : null
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
          info={auth.account && event.attendees.find(o => o.accountId === auth.account.id)}
          bankAccount={getService.service && getService.service.bankAccount}
          onClose={() => this.setState({
            isApplicationInfoModalOpen: false,
          })}
          handleRemove={this.handleAttendanceRemove}
        />
        <AttendanceManager
          open={isAttendanceManagerModalOpen}
          onClose={() => this.setState({
            isAttendanceManagerModalOpen: false,
          })}
          eventId={event.id}
        />
        <RemoveModal
          open={isRemoveModalOpen}
          onClose={() => this.setState({
            isRemoveModalOpen: false,
          })}
          handleRemove={this.handleRemove}
        />
        <UpdateModal
          open={isUpdateModalOpen}
          event={event}
          onClose={() => this.setState({
            isUpdateModalOpen: false,
          })}
          handleUpdate={this.handleUpdate}
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
  removeEvent: state.data.event.removeEvent,
  updateEvent: state.data.event.updateEvent,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  noticeDialogOn: on,
  getEventByIdRequest,
  addReplyRequest,
  removeReplyRequest,
  addAttendanceRequest,
  removeAttendanceRequest,
  removeEventRequest: eventActions.removeEventRequest,
  updateEventRequest: eventActions.updateEventRequest,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail));
