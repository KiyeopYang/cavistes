import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  withRouter,
  Redirect,
} from 'react-router-dom';
import { push } from 'react-router-redux';
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
    }
  }
  render() {
    const {
      auth,
    } = this.props;
    const {
      selectedEvent,
      isApplicationFormModalOpen,
    } = this.state;
    return (
      <Fragment>
        <Layout>
          <Front/>
          <Title/>
          <hr />
          <Content selectedEvent={selectedEvent}/>
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
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail));
