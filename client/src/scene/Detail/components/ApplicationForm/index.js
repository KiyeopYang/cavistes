/* global IMP */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  withRouter,
  Redirect,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import * as noticeDialogActions from '../../../../data/noticeDialog/actions';
import * as authActions from '../../../../data/auth/actions';
import Layout from './components/Layout';
import Form from './components/Form';
import Bank from './components/Bank';
import PaymentTool from './components/PaymentTool';

class ApplicationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'form',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.setState({ view: 'form' })
    }
  }
  handleLogin = (data) => {
    this.props.loginRequest(data)
      .then(() => {
        if (this.props.login.status === 'FAILURE') {
          throw this.props.login.error;
        } else {
          this.props.onClose();
          this.props.authRequest();
        }
      })
      .catch((error) => {
        this.props.noticeDialogOn(error);
      })
  };
  handleCardPaymentStart = () => {
    const { event, auth } = this.props;
    IMP.init('imp53268559');
    IMP.request_pay({ // param
      pg: "danal_tpay",
      pay_method: "card",
      merchant_uid: "ORD20180131-1645512",
      name: event.title,
      amount: event.price,
      buyer_name: auth.account.name,
      buyer_tel: auth.account.phone,
    }, (rsp) => { // callback
      if (rsp.success) {
        console.log('success');
      } else {
        console.log('failure');
      }
    });
  };
  render() {
    const {
      open,
      onClose,
      auth,
      event,
    } = this.props;
    const {
      view,
    } = this.state;
    return (
      <Layout
        open={open}
        onClose={onClose}
        title="신청하기"
      >
        {
          view === 'form' ?
            <Form
              event={event}
              user={auth.account}
              handleNext={() => this.setState({
                view: 'paymentTool',
              })}
            /> :
          view === 'paymentTool' ?
            <PaymentTool
              handleNext={(tool) => {
                if (tool === 'card') {
                  this.handleCardPaymentStart();
                } else {
                  this.setState({
                    view: 'bank',
                  });
                }
              }}
            /> : <Bank onSubmit={onClose} />
        }
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.data.auth,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  noticeDialogOn: noticeDialogActions.on,
  authRequest: authActions.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplicationForm));
