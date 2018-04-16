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
import Terms from './components/Terms';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'form',
    };
  }
  render() {
    const { open, onClose } = this.props;
    const { view } = this.state;
    return (
      <Layout
        open={open}
        onClose={onClose}
      >
        {
          view === 'terms' ?
            <Terms/> : <Form/>
        }
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
)(SignUp));
