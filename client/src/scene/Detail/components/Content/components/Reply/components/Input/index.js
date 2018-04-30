import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import IconCreate from '@material-ui/icons/Create'

const styles = theme => ({
  root: {
    marginBottom: 20,
  },
  textField: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
});
class Input extends React.Component {
  state = {
    value: '',
  };
  onChange = e => this.setState({
    value: e.target.value,
  });
  handleSubmit = () => {
    const { value } = this.state;
    if (value !== '') {
      this.props.handleSubmit(value);
      this.setState({
        value: '',
      });
    }
  };
  render() {
    const {
      classes,
    } = this.props;
    return (
      <div className={classes.root}>
        <TextField
          label="후기를 작성해주세요."
          className={classes.textField}
          fullWidth
          multiline
          value={this.state.value}
          onChange={this.onChange}
        />
        <Button
          className={classes.button}
          fullWidth
          onClick={this.handleSubmit}
        >
          <IconCreate/>글쓰기
        </Button>
      </div>
    );
  }
}
export default withStyles(styles)(Input);
