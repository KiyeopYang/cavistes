import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import {
  addEventRequest,
  getEventRequest,
  getEventByIdRequest,
  updateEventRequest,
} from '../../data/event/actions';
import Layout from './components/Layout';
import Form from './components/Form';
import * as noticeDialogActions from '../../data/noticeDialog/actions';
import ImageUploaderModal from '../../components/ImageUploaderModal';
import ImageForm from './components/ImageForm';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageAddMode: false,
      isImageUploaderModalOpen: false,
    };
  }
  handleConfirm = () => {
    const { addEvent, auth } = this.props;
    this.props.updateEventRequest(addEvent.result._id, { isConfirmed: true })
      .then(() => {
        this.props.getEventByIdRequest(addEvent.result._id)
          .then(() => {
            this.props.getEventRequest();
            this.props.push('/');
          });
      });
  };
  handleUpdate = (images) => {
    const { addEvent } = this.props;
    this.props.updateEventRequest(addEvent.result._id, {
      images: images.filter(i => i.path),
    })
      .then(() => {
        this.props.getEventByIdRequest(addEvent.result._id)
      });
  };
  handleAddEvent = (input) => {
    const { auth } = this.props;
    input.sponsor.id = auth.account && auth.account.id;
    this.props.addEventRequest(input)
      .then(() => {
        if (this.props.addEvent.status === 'FAILURE') {
          throw this.props.addEvent.error;
        } else {
          this.props.noticeDialogOn('생성 완료. 이미지를 수정하세요.');
          this.props.getEventByIdRequest(this.props.addEvent.result._id)
            .then(() => {
              this.setState({
                imageAddMode: true,
              });
            });
        }
      })
      .catch((error) => {
        this.props.noticeDialogOn(error);
      })
  };
  render() {
    const { auth, getEventById } = this.props;
    const { isImageUploaderModalOpen, imageAddMode } = this.state;
    return (
      <Layout>
        {
          auth.account && auth.account.type === 'sponsor' ?
            <Form
              sponsor={auth.account}
              handleSubmit={this.handleAddEvent}
              disabled={imageAddMode}
            /> : null
        }
        {
          imageAddMode ?
            <ImageForm
              event={getEventById.event}
              openImageUploader={() => this.setState({
                isImageUploaderModalOpen:true
              })}
              onSubmit={this.handleConfirm}
            />
            :null
        }
        <ImageUploaderModal
          open={isImageUploaderModalOpen}
          onClose={() => this.setState({
            isImageUploaderModalOpen: false,
          })}
          onSubmit={this.handleUpdate}
        />
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.data.auth,
  addEvent: state.data.event.addEvent,
  updateEvent: state.data.event.updateEvent,
  getEventById: state.data.event.getEventById,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  noticeDialogOn: noticeDialogActions.on,
  addEventRequest,
  updateEventRequest,
  getEventByIdRequest,
  getEventRequest,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Add));
