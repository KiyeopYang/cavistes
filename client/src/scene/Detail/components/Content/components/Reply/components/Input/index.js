import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconCreate from '@material-ui/icons/Create'

const styles = theme => ({
  root: {
    marginBottom: 20,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'inherit',
    },
  },
  textField: {
    flex: 1,
    background: 'rgb(249,249,249)',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      minHeight: 50,
    },
  },
  button: {
    width: 100,
    height: '100%',
    background: 'rgb(117,117,117)',
    color: 'white',
    borderRadius: 0,
    margin: 0,
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 'auto',
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
          placeholder="댓글 작성"
          className={classes.textField}
          multiline
          value={this.state.value}
          onChange={this.onChange}
          InputProps={{
            disableUnderline: true,
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div>
          <Button
            className={classes.button}
            onClick={this.handleSubmit}
          >
            APPLY
          </Button>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Input);
