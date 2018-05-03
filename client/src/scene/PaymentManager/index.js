import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  withRouter,
  Redirect,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import * as noticeDialogActions from '../../data/noticeDialog/actions';
import {
  getPaymentRequest,
} from './data/payment/actions';
import Layout from './components/Layout';
import Table from './components/Table';

class PaymentManager extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.props.getPaymentRequest()
        .then(() => {
          if (this.props.getPayment.status === 'FAILURE') {
            throw this.props.getPayment.error;
          }
        })
        .catch((error) => {
          this.props.noticeDialogOn(error);
        });
    }
  }
  render() {
    const {
      open,
      onClose,
      getPayment,
    } = this.props;
    return (
      <Layout
        open={open}
        onClose={onClose}
        title="결제 내역"
      >
        <Table
          rows={getPayment.payment.map((o) => {
            const date = new Date(o.datetime);
            return {
              ...o,
              datetime: `${date.getUTCFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}시 ${date.getMinutes()}분`,
            };
          })}
        />
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.data.auth,
  getPayment: state.PaymentManager.data.payment.getPayment,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  noticeDialogOn: noticeDialogActions.on,
  getPaymentRequest,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentManager));
