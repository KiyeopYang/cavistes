/* global IMP */
import React from 'react';
import Layout from './components/Layout';
import Form from './components/Form';
import PaymentTool from './components/PaymentTool';

class ApplicationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'form',
      name: '',
      phone: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    const view = nextProps.view || 'form';
    if (!this.props.open && nextProps.open) {
      this.setState({ view });
    }
  }
  // handleCardPaymentStart = () => {
  //   const { event, auth } = this.props;
  //   IMP.init('imp53268559');
  //   IMP.request_pay({ // param
  //     pg: "danal_tpay",
  //     pay_method: "card",
  //     merchant_uid: "ORD20180131-1645512",
  //     name: event.title,
  //     amount: event.price,
  //     buyer_name: auth.account.name,
  //     buyer_tel: auth.account.phone,
  //   }, (rsp) => { // callback
  //     if (rsp.success) {
  //       console.log('success');
  //     } else {
  //       console.log('failure');
  //     }
  //   });
  // };
  render() {
    const {
      open,
      onClose,
      account,
      event,
      onSubmit,
    } = this.props;
    const {
      view,
      name,
      phone,
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
              user={account}
              handleNext={({ name, phone }) => this.setState({
                view: 'paymentTool',
                name,
                phone,
              })}
            /> :
          view === 'paymentTool' ?
            <PaymentTool
              handleNext={(tool) => {
                if (tool === 'card') {
                  this.handleCardPaymentStart();
                } else {
                  this.props.onSubmit({
                    orderMethod: '무통장입금',
                    name,
                    phone,
                  });
                }
              }}
            /> : null
        }
      </Layout>
    );
  }
}
export default ApplicationForm;
