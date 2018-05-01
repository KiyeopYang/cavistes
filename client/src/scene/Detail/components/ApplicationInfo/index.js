/* global IMP */
import React from 'react';
import Layout from './components/Layout';
import Bank from './components/Bank';
import Status from './components/Status';
import Event from './components/Event';

class ApplicationInfo extends React.Component {
  render() {
    const {
      open,
      onClose,
      bankAccount,
      info,
      account,
      event,
      onSubmit,
    } = this.props;
    console.log(info);
    return (
      <Layout
        open={open}
        onClose={onClose}
        title="결제 정보"
      >
        <Event event={event}/>
        {
          info.status === '입금대기' ?
            <Bank bankAccount={bankAccount}/> : null
        }
        <Status status={info.status}/>
      </Layout>
    );
  }
}
export default ApplicationInfo;
