import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  withRouter,
  Redirect,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { Element, animateScroll } from 'react-scroll';
import EventCalendarModal from '../../components/EventCalendarModal';
import Layout from '../../components/Layout';
import Title from './components/Title';
import Events from './components/Events';
import Contact from './components/Contact';
import More from './components/More';
import * as noticeDialogActions from '../../data/noticeDialog/actions';
import * as eventActions from '../../data/event/actions';
import * as serviceActions from '../../data/service/actions';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      selectedEvent: [],
    };
    this.props.getEventRequest()
  }
  handleCalendar = (datetimes) => {
    this.setState({
      isModalOpen: true,
      selectedEvent: datetimes,
    });
  };
  handleEventClick = (id) => {
    animateScroll.scrollToTop({
      smooth: false,
      duration: 0,
    });
    this.props.push(`/detail/${id}`);
  };
  handleClickMore = () => {
    const { getEvent } = this.props;
    this.props.getEventRequest(getEvent.page + 1);
  };
  handleTitleImageUpdate = (images) => {
    this.props.updateServiceRequest({
      titleImages: images.filter(o => o && !!o.path),
    })
      .then(() => {
        if (this.props.updateService.status === 'FAILURE') {
          throw this.props.updateService.error;
        } else {
          this.props.noticeDialogOn('수정 완료');
          this.props.getServiceRequest();
        }
      })
      .catch((error) => {
        this.props.noticeDialogOn(error);
      })
  };
  render() {
    const {
      auth,
      getService,
      getEvent,
      push,
    } = this.props;
    const {
      isModalOpen,
      selectedEvent,
    } = this.state;
    const type = auth.account && auth.account.type;
    return (
      <div>
        <Layout>
          <Element name="about">
            <Title
              managerMode={type === 'manager'}
              titleImages={(getService.service && getService.service.titleImages) || []}
              handleUpdate={this.handleTitleImageUpdate}
            />
          </Element>
          <Element name="event">
            <Events
              createMode={type === 'sponsor'}
              eventList={getEvent.event}
              onClickCreate={() => push('/add')}
              handleCalendar={this.handleCalendar}
              handleClick={this.handleEventClick}
            />
          </Element>
          <More handleClick={this.handleClickMore}/>
        </Layout>
        <Element name="contact">
          <Contact/>
        </Element>
        <EventCalendarModal
          selectedEvent={selectedEvent}
          open={isModalOpen}
          onClose={() => this.setState({ isModalOpen: false })}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.data.auth,
  getService: state.data.service.getService,
  updateService: state.data.service.updateService,
  getEvent: state.data.event.getEvent,
  addEvent: state.data.event.addEvent,
  updateEvent: state.data.event.updateEvent,
  removeEvent: state.data.event.removeEvent,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  noticeDialogOn: noticeDialogActions.on,
  getServiceRequest: serviceActions.getServiceRequest,
  updateServiceRequest: serviceActions.updateServiceRequest,
  getEventRequest: eventActions.getEventRequest,
  addEventRequest: eventActions.addEventRequest,
  updateEventRequest: eventActions.updateEventRequest,
  removeEventRequest: eventActions.removeEventRequest,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main));
