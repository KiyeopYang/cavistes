import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import prefixer from '../../../../../../modules/prefixer';

const styles = theme => prefixer({
  forms: {
    width: '100%',
  },
});
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  handleInputChange = (prop) => {
    return (e) => {
      this.setState({
        [prop]: e.target.value,
      })
    }
  };
  render() {
    const {
      classes,
      toSignUp,
    } = this.props;
    return (
      <React.Fragment>
        <Typography type="headline">
          LOGIN
        </Typography>
        <form>
          <TextField
            className={classes.forms}
            id="email"
            label="EMAIL"
            type="email"
            margin="normal"
            value={this.state.email}
            onChange={this.handleInputChange('email')}
          />
          <TextField
            className={classes.forms}
            id="password"
            label="PASSWORD"
            margin="normal"
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange('password')}
          />
          <Typography
            className={classes.findPwd}
            align="right"
          >
            <Button
              onClick={toSignUp}
            >
              Sign Up
            </Button>
          </Typography>
          <Button
            type="submit"
            className={classes.forms}
            color="primary"
            raised
            onClick={(e) => {
              e.preventDefault();
              this.props.handleLogin(this.state);
            }}
            disabled={!this.state.email.length || !this.state.password.length}
          >
            SUBMIT
          </Button>
        </form>
      </React.Fragment>
    )
  }
}
export default withStyles(styles, { withTheme: true })(LoginForm);
