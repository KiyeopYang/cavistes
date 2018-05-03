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
import * as locationActions from './data/location/actions';
import * as authActions from '../../data/auth/actions';
import Layout from './components/Layout';
import Table from './components/Table';
import Title from './components/Title';
import Tools from './components/Tools';
import EditModal from './components/EditModal';

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditModalOpen: false,
      editModalMode: 'create',
      selected: null,
    };
    this.props.getLocationRequest();
  }
  handleSubmit = (input) => {
    const { selected, editModalMode } = this.state;
    if (editModalMode === 'create') {
      this.props.addLocationRequest({
        ...input,
        account: this.props.auth.account,
      })
        .then(() => {
          const { location, noticeDialogOn, getLocationRequest } = this.props;
          if (location.addLocation.status === 'SUCCESS') {
            this.setState({
              isEditModalOpen: false,
            });
            getLocationRequest();
            noticeDialogOn('생성되었습니다.');
          } else {
            throw location.addLocation.error;
          }
        })
        .catch(this.props.noticeDialogOn);
    } else if (editModalMode === 'update') {
      this.props.updateLocationRequest(selected.id, {
        ...input,
      })
        .then(() => {
          const { location, noticeDialogOn, getLocationRequest } = this.props;
          if (location.updateLocation.status === 'SUCCESS') {
            this.setState({
              isEditModalOpen: false,
            });
            getLocationRequest();
            noticeDialogOn('수정되었습니다.');
          } else {
            throw location.updateLocation.error;
          }
        })
        .catch(this.props.noticeDialogOn);
    }
  };
  handleRemove = () => {
    const { selected } = this.state;
    this.props.removeLocationRequest(selected.id)
      .then(() => {
        const { location, noticeDialogOn, getLocationRequest } = this.props;
        if (location.removeLocation.status === 'SUCCESS') {
          this.setState({
            isEditModalOpen: false,
          });
          getLocationRequest();
          noticeDialogOn('삭제되었습니다.');
        } else {
          throw location.removeLocation.error;
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
    const { location, auth } = this.props;
    const { getLocation } = location;
    const managerMode = auth.account && auth.account.type === 'manager';
    return (
      <Layout>
        <Title text="강의실"/>
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
            selected: getLocation.location.find(o => o.id === id),
          })}
          rows={getLocation.location.map((o) => {
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
  location: state.Location.data.location,
  auth: state.data.auth,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  noticeDialogOn: noticeDialogActions.on,
  getLocationRequest: locationActions.getLocationRequest,
  addLocationRequest: locationActions.addLocationRequest,
  updateLocationRequest: locationActions.updateLocationRequest,
  removeLocationRequest: locationActions.removeLocationRequest,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Location));
