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

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEvent: [new Date()],
    }
  }
  render() {
    const { selectedEvent } = this.state;
    return (
      <Fragment>
        <Layout>
          <Front/>
          <Title/>
          <hr />
          <Content selectedEvent={selectedEvent}/>
        </Layout>
        <Submit/>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  state,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail));
