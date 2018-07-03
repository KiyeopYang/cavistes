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
import * as serviceActions from '../../data/service/actions';
import Layout from './components/Layout';
import BankAccount from './components/BankAccount';

const BANKS = [
  { name: '국민은행', code: 4 },
  { name: '신한은행', code: 88 },
  { name: '기업은행', code: 3 },
  { name: '우리은행', code: 20 },
  { name: '농협', code: 11 },
  { name: 'SC제일', code: 23 },
  { name: '하나은행', code: 81 },
];
class ServiceManager extends React.Component {
  handleUpdate = (input) => {
    this.props.updateServiceRequest({
      bankAccount: {
        bank: BANKS.find(o => parseInt(input.bankCode) === o.code).name,
        ...input,
      },
    })
      .then(() => {
        const { updateService } = this.props;
        if (updateService.status === 'SUCCESS') {
          this.props.noticeDialogOn('수정이 완료되었습니다.');
          this.props.getServiceRequest();
        } else {
          throw updateService.error;
        }
      })
      .catch((error) => {
        this.props.noticeDialogOn(error);
      });
  };
  render() {
    const {
      open,
      onClose,
      getService,
    } = this.props;
    const { service } = getService;
    if (!service) return null;
    return (
      <Layout
        open={open}
        onClose={onClose}
        title="서비스 관리"
      >
        <BankAccount
          {...service.bankAccount}
          banks={BANKS}
          handleSubmit={this.handleUpdate}
        />
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  getService: state.data.service.getService,
  updateService: state.data.service.updateService,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  noticeDialogOn: noticeDialogActions.on,
  getServiceRequest: serviceActions.getServiceRequest,
  updateServiceRequest: serviceActions.updateServiceRequest,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServiceManager));
