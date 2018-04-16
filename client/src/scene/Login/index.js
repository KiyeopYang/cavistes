import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  withRouter,
  Redirect,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import Layout from './components/Layout';
import Form from './components/Form';

class Login extends React.Component {
  render() {
    const { open, onClose } = this.props;
    return (
      <Layout
        open={open}
        onClose={onClose}
      >
        <Form/>
      </Layout>
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
)(Login));
