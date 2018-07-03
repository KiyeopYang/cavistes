import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import Background from '../../components/Background';
import Body from '../../components/ItemBody';
import * as accountActions from '../../data/account/actions';
import * as dialog from '../../../../data/noticeDialog/actions';
import loader from '../../../../modules/loader';
import Opening from './components/Opening';

class SetConfiguration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scene: 'opening',
    }
  }
  render() {
    return (
      <Background>
        <Body>
          <Opening />
        </Body>
      </Background>
    );
  }
}
const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  notice: dialog.on,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetConfiguration));
