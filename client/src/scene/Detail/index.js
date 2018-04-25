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
import Content from './components/Content';
import Front from './components/Front';
import Layout from './components/Layout';
import Title from './components/Title';
import Submit from './components/Submit';
import ApplicationForm from './components/ApplicationForm';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEvent: [
        new Date(2018,4,1),
        new Date(2018,4,8),
        new Date(2018,4,15),
        new Date(2018,4,22),
      ],
      isApplicationFormModalOpen: false,
    };
    const { match } = this.props;
    if (match.params.id) {
      this.props.getEventByIdRequest(match.params.id)
    }
  }
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
          />
        </Layout>
        {
          auth.account && auth.account.type === 'default' ?
            <Submit
              onSubmit={() => this.setState({
                isApplicationFormModalOpen: true,
              })}
            /> : null
        }
        <ApplicationForm
          open={isApplicationFormModalOpen}
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
});
const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  getEventByIdRequest,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail));
