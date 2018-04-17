import React, { Fragment } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const styles = {
  title: {
    fontSize: 20,
  },
  login: {
    marginTop: 16,
  },
};
class Bank extends React.Component {
  render() {
    const {
      classes,
      onSubmit,
    } = this.props;
    return (
      <Fragment>
        <Typography
          className={classes.title}
          align="center"
          gutterBottom
        >
          다음 계좌로 입금해주시면 신청이 완료됩니다.
        </Typography>
        <Typography
          align="center"
          gutterBottom
        >
          <strong>은행 : </strong>외환은행
        </Typography>
        <Typography
          align="center"
          gutterBottom
        >
          <strong>계좌번호 : </strong>1002-844-033300
        </Typography>
        <Typography
          align="center"
          gutterBottom
        >
          <strong>예금주 : </strong>양기엽
        </Typography>
        <Typography
          variant="title"
          align="center"
          gutterBottom
        >
          <strong>현재 상태 : </strong>입금 대기
        </Typography>
      </Fragment>
    );
  }
}
export default withStyles(styles)(Bank);
