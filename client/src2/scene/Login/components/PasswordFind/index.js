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
class PasswordFind extends React.Component {
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
          helperText="가입하신 이메일로 비밀번호 변경 링크를 보내드립니다."
        />
        <Button
          className={classes.login}
          fullWidth
          color="primary"
          variant="raised"
          size="large"
        >
          비밀번호 찾기
        </Button>
      </Fragment>
    );
  }
}
export default withStyles(styles)(PasswordFind);
