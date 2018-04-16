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
import EventCalendarModal from '../../components/EventCalendarModal';
import Layout from '../../components/Layout';
import Title from './components/Title';
import Events from './components/Events';
import Contact from './components/Contact';
import More from './components/More';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      selectedEvent: [new Date(), new Date(2017,6,8), new Date(2017,6,15)],
    }
  }
  handleCalendar = (id) => {
    this.setState({
      isModalOpen: true,
    });
  };
  handleEventClick = () => {
    this.props.push('/detail');
  };
  render() {
    const { isModalOpen, selectedEvent } = this.state;
    return (
      <div>
        <Layout>
          <Title/>
          <Events
            handleCalendar={this.handleCalendar}
            handleClick={this.handleEventClick}
          />
          <More />
        </Layout>
        <Contact/>
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
  state,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  push,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main));
