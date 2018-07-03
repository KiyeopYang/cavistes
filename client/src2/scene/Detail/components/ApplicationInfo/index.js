/* global IMP */
import React from 'react';
import Button from 'material-ui/Button';
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
      handleRemove,
    } = this.props;
    if (!info) return null;
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
        <Status {...info} />
        <Button
          color="primary"
          onClick={handleRemove}
          disabled={info.status !== '입금대기'}
        >
          {
            info.status === '입금대기' ?
              '취소 요청' : info.status === '입금완료' ? '취소는 전화로 문의부탁드립니다.' : '취소 완료'
          }
        </Button>
      </Layout>
    );
  }
}
export default ApplicationInfo;
