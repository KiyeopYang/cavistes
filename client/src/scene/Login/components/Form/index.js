import React, { Fragment } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const styles = {
  title: {
    fontSize: 32,
  },
  login: {
    marginTop: 16,
  },
};
class Form extends React.Component {
  render() {
    const { classes }  = this.props;
    return (
      <Fragment>
        <Typography
          className={classes.title}
          align="center"
        >
          CAVISTES
        </Typography>
        <TextField
          label="이메일"
          fullWidth
          margin="dense"
        />
        <TextField
          label="비밀번호"
          fullWidth
          margin="dense"
        />
        <Button
          className={classes.login}
          fullWidth
          color="primary"
          variant="raised"
          size="large"
        >
          로그인
        </Button>
        <Button>
          회원가입
        </Button>
        <Button>
          비밀번호 찾기
        </Button>
      </Fragment>
    );
  }
}
export default withStyles(styles)(Form);
