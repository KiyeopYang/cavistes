import React from 'react';
import { withStyles } from 'material-ui/styles';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import ImageUploader from '../ImageUploader';

const styles = {};
class ImageUploaderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.setState({
        images: [],
      });
    }
  }
  onComplete = (id, name, res) => {
    const {
      path,
      uuid,
      filename,
      size,
      mimetype,
    } = res;
    this.setState(state => ({
      images: state.images.concat({
        path,
        uuid,
        filename,
        size,
        mimetype,
      }),
    }));
  };
  render() {
    const { open, onClose, onSubmit } = this.props;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={onClose}
      >
        <div style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          position: 'absolute',
          minWidth: 300,
        }}>
          <ImageUploader
            onComplete={this.onComplete}
          />
          <Button
            color="primary"
            variant="raised"
            fullWidth
            onClick={() => {
              onSubmit(this.state.images);
              onClose();
            }}
          >
            확인
          </Button>
        </div>
      </Modal>
    )
  }
}
export default withStyles(styles)(ImageUploaderModal);
