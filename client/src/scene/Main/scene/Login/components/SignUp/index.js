import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import prefixer from '../../../../../../modules/prefixer';

const styles = theme => prefixer({
  forms: {
    width: '100%',
  },
  findPwd: {
    marginBottom: '1em',
  },
});
class FindPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordCheck: '',
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
      handleSignUp,
      goBack
    } = this.props;
    return (
      <React.Fragment>
        <Typography type="headline">
          SIGN UP
        </Typography>
        <form>
          <TextField
            className={classes.forms}
            id="emailForm"
            label="Email"
            type="email"
            margin="normal"
            value={this.state.email}
            onChange={this.handleInputChange('email')}
          />
          <TextField
            className={classes.forms}
            id="password"
            label="PASSWORD(MIN Length:8)"
            margin="normal"
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange('password')}
          />
          <TextField
            className={classes.forms}
            id="passwordCheck"
            label="PASSWORD AGAIN"
            margin="normal"
            type="password"
            value={this.state.passwordCheck}
            onChange={this.handleInputChange('passwordCheck')}
          />
          <Button
            type="submit"
            className={classes.forms}
            color="primary"
            raised
            onClick={(e) => {
              e.preventDefault();
              handleSignUp({
                email: this.state.email,
                password: this.state.password,
              });
            }}
            disabled={!this.state.email.length ||
            this.state.password.length < 8 ||(
              this.state.password !== this.state.passwordCheck
            )}
          >
            SUBMIT
          </Button>
          <Button
            className={classes.forms}
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              goBack();
            }}
          >
            LOGIN PAGE
          </Button>
        </form>
      </React.Fragment>
    )
  }
}
export default withStyles(styles, { withTheme: true })(FindPassword);
