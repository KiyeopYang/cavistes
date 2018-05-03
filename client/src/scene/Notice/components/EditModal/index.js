import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Layout from '../ModalLayout';

const styles = theme => ({
  title: {
    fontSize: 24,
  },
  submit: {
    marginTop: 16,
  },
  text: {
    whiteSpace: 'pre-line',
  },
});
class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.selected) !== JSON.stringify(nextProps.selected)) {
      const { title, text } = nextProps.selected;
      this.setState({
        title,
        text,
      });
    }
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleSubmit = () => {
    this.props.handleSubmit(this.state);
  };
  render() {
    const {
      title,
      text,
    } = this.state;
    const {
      open,
      onClose,
      mode,
      classes,
      managerMode,
      handleRemove,
    } = this.props;
    return (
      <Layout
        open={open}
        onClose={onClose}
      >
        {managerMode ?
          <div>
            <TextField
              required
              fullWidth
              label="타이틀"
              value={title}
              onChange={this.handleChange('title')}
            />
            <TextField
              required
              fullWidth
              multiline
              label="내용"
              value={text}
              onChange={this.handleChange('text')}
            />
            <Button
              className={classes.submit}
              color="primary"
              variant="raised"
              size="large"
              fullWidth
              onClick={this.handleSubmit}
            >
              {mode === 'create' ? '생성' : '수정'}
            </Button>
            {
              mode === 'update' ?
                <Button
                  className={classes.submit}
                  color="primary"
                  size="large"
                  fullWidth
                  onClick={handleRemove}
                >
                  삭제
                </Button> : null
            }
          </div> :
          <div>
            <Typography variant="subheading" gutterBottom>
              <strong>{title}</strong>
            </Typography>
            <Typography className={classes.text} variant="body2" gutterBottom>
              {text}
            </Typography>
          </div>
        }
      </Layout>
    );
  }
}
export default withStyles(styles)(EditModal);
