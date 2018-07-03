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
import * as sponsorActions from './data/sponsor/actions';
import * as authActions from '../../data/auth/actions';
import Layout from './components/Layout';
import Table from './components/Table';
import Title from './components/Title';
import Tools from './components/Tools';
import EditModal from './components/EditModal';

class Sponsor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditModalOpen: false,
      editModalMode: 'create',
      selected: null,
    };
    this.props.getSponsorRequest();
  }
  handleSubmit = (input) => {
    const { selected, editModalMode } = this.state;
    if (editModalMode === 'create') {
      this.props.addSponsorRequest({
        ...input,
        account: this.props.auth.account,
      })
        .then(() => {
          const { sponsor, noticeDialogOn, getSponsorRequest } = this.props;
          if (sponsor.addSponsor.status === 'SUCCESS') {
            this.setState({
              isEditModalOpen: false,
            });
            getSponsorRequest();
            noticeDialogOn('생성되었습니다.');
          } else {
            throw sponsor.addSponsor.error;
          }
        })
        .catch(this.props.noticeDialogOn);
    } else if (editModalMode === 'update') {
      this.props.updateSponsorRequest(selected.id, {
        ...input,
      })
        .then(() => {
          const { sponsor, noticeDialogOn, getSponsorRequest } = this.props;
          if (sponsor.updateSponsor.status === 'SUCCESS') {
            this.setState({
              isEditModalOpen: false,
            });
            getSponsorRequest();
            noticeDialogOn('수정되었습니다.');
          } else {
            throw sponsor.updateSponsor.error;
          }
        })
        .catch(this.props.noticeDialogOn);
    }
  };
  handleRemove = () => {
    const { selected } = this.state;
    this.props.removeSponsorRequest(selected.id)
      .then(() => {
        const { sponsor, noticeDialogOn, getSponsorRequest } = this.props;
        if (sponsor.removeSponsor.status === 'SUCCESS') {
          this.setState({
            isEditModalOpen: false,
          });
          getSponsorRequest();
          noticeDialogOn('삭제되었습니다.');
        } else {
          throw sponsor.removeSponsor.error;
        }
      })
      .catch(this.props.noticeDialogOn);
  };
  render() {
    const {
      isEditModalOpen,
      editModalMode,
      selected,
    } = this.state;
    const { sponsor, auth } = this.props;
    const { getSponsor } = sponsor;
    const managerMode = auth.account && auth.account.type === 'manager';
    return (
      <Layout>
        <Title text="주최자"/>
        {
          managerMode ?
            <Tools onClick={() => this.setState({
              isEditModalOpen: true,
              editModalMode: 'create',
            })}/> : null
        }
        <Table
          handleClick={id => this.setState({
            isEditModalOpen: true,
            editModalMode: managerMode ? 'update' : 'view',
            selected: getSponsor.sponsor.find(o => o.id === id),
          })}
          rows={getSponsor.sponsor.map((o) => {
            const date = new Date(o.datetime);
            return {
              ...o,
              datetime: `${date.getUTCFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}시 ${date.getMinutes()}분`,
            };
          })}
        />
        <EditModal
          open={isEditModalOpen}
          onClose={() => this.setState({ isEditModalOpen: false })}
          selected={selected}
          mode={editModalMode}
          managerMode={managerMode}
          handleSubmit={this.handleSubmit}
          handleRemove={this.handleRemove}
        />
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  sponsor: state.Sponsor.data.sponsor,
  auth: state.data.auth,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  noticeDialogOn: noticeDialogActions.on,
  getSponsorRequest: sponsorActions.getSponsorRequest,
  addSponsorRequest: sponsorActions.addSponsorRequest,
  updateSponsorRequest: sponsorActions.updateSponsorRequest,
  removeSponsorRequest: sponsorActions.removeSponsorRequest,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sponsor));
