import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = {
  title: {
    fontSize: 32,
  },
  login: {
    marginTop: 16,
  },
};
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  handleChange = name => e => this.setState({
    [name]: e.target.value,
  });
  disabled = () => {
    const { email, password } = this.state;
    return !email.length || !password.length;
  };
  handleSubmit = () => {
    this.props.handleSubmit(this.state);
  };
  render() {
    const {
      classes,
      handlePasswordFind,
    }  = this.props;
    const {
      email,
      password,
    } = this.state;
    return (
      <Fragment>
        <Typography
          className={classes.title}
          align="center"
        >
          CAVISTES
        </Typography>
        <form>
          <TextField
            label="이메일"
            fullWidth
            margin="dense"
            onChange={this.handleChange('email')}
            value={email}
          />
          <TextField
            label="비밀번호"
            fullWidth
            margin="dense"
            type="password"
            onChange={this.handleChange('password')}
            value={password}
          />
          <Button
            type="submit"
            className={classes.login}
            fullWidth
            color="primary"
            variant="raised"
            size="large"
            onClick={(e) => {
              e.preventDefault();
              this.handleSubmit(e);
            }}
            disabled={this.disabled()}
          >
            로그인
          </Button>
        </form>
        <Button
          onClick={handlePasswordFind}
        >
          비밀번호 찾기
        </Button>
      </Fragment>
    );
  }
}
export default withStyles(styles)(Form);
