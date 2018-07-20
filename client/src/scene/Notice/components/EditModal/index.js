import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingIcon from '@material-ui/icons/Settings';
import Layout from '../ModalLayout';
import RemoveModal from '../../../../components/RemoveModal';

const styles = theme => ({
  submit: {
    marginTop: 16,
  },
  text: {
    whiteSpace: 'pre-line',
  },
  iconWrapper: {
    width: '100%',
    textAlign: 'right',
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
  title: {
    fontSize: 22,
  },
  divider: {
    marginTop: 8,
    marginBottom: 8,
    width: '100%',
    height: 1,
    background: 'lightgrey',
  },
});
class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      isRemoveModalOpen: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open && nextProps.mode === 'create') {
      this.setState({
        title: '',
        text: '',
        isRemoveModalOpen: false,
      });
    }
    if (JSON.stringify(this.props.selected) !== JSON.stringify(nextProps.selected)) {
      const { title, text } = nextProps.selected;
      this.setState({
        title,
        text,
        isRemoveModalOpen: false,
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
      isRemoveModalOpen,
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
              rows={15}
              required
              fullWidth
              multiline
              label="내용"
              value={text}
              onChange={this.handleChange('text')}
            />
            <div className={classes.iconWrapper}>
              <Button
                className={classes.submit}
                color="primary"
                onClick={this.handleSubmit}
              >
                {mode === 'create' ?
                  <CreateIcon className={classes.icon}/>
                : <SettingIcon className={classes.icon}/>}
                {mode === 'create' ? '생성' : '수정'}
              </Button>
              {
                mode === 'update' ?
                  <Button
                    className={classes.submit}
                    color="primary"
                    onClick={() => this.setState({
                      isRemoveModalOpen: true,
                    })}
                  >
                    <DeleteIcon className={classes.icon}/>삭제
                  </Button> : null
              }
            </div>
          </div> :
          <div>
            <Typography className={classes.title}>
              <strong>{title}</strong>
            </Typography>
            <div className={classes.divider}/>
            <Typography className={classes.text}>
              {text}
            </Typography>
          </div>
        }
        <RemoveModal
          open={isRemoveModalOpen}
          onClose={() => this.setState({
            isRemoveModalOpen: false,
          })}
          handleRemove={handleRemove}
        />
      </Layout>
    );
  }
}
export default withStyles(styles)(EditModal);
