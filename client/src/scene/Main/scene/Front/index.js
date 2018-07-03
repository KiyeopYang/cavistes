import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import * as noticeDialogActions from '../../../../data/noticeDialog/actions';
import * as webPushActions from '../../../../data/webPush/actions';
import loader from '../../../../data/loader/actions';
import Background from '../../components/Background';

class Front extends React.Component {
  openWebPush = () => {
    this.props.loader(true);
    this.props.subscribeWebPush()
      .then(() => {
        this.props.loader(false);
        switch(this.props.webPush.status) {
          case webPushActions.UNSUPPORTED:
            this.props.notice({
              title: '웹 푸시 불가',
              text: '브라우저에서 지원하지 않습니다.\n' +
              '크롬, 삼성브라우저, 맥북 사파리, 파이어폭스, 오페라를 지원합니다.',
            });
            break;
          case webPushActions.DENIED:
            this.props.notice({
              title: '웹 푸시 불가',
              text: '권한이 거부되었습니다. 브라우저 설정을 변경하십시요.',
            });
            break;
          case webPushActions.IDLE:
            this.props.notice({
              title: '웹 푸시 불가',
              text: '다시 한번 시도하여 주십시요.',
            });
            break;
          default:
            this.props.changePage(`/example`);
        }
      })
      .catch((error) => {
        this.props.loader(false);
        console.error(error);
        this.props.notice({
          title: '웹 푸시 불가',
          text: '에러가 있습니다.',
        });
      });
  };
  render() {
    return (
      <Background>

      </Background>
    )
  }
}
const mapStateToProps = state => ({
  webPush: state.data.webPush,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  notice: noticeDialogActions.on,
  subscribeWebPush: webPushActions.subscribeWebPush,
  loader,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Front));
