import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
      bankAccount,
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
          <strong>은행 : </strong>{bankAccount.bank}
        </Typography>
        <Typography
          align="center"
          gutterBottom
        >
          <strong>계좌번호 : </strong>{bankAccount.number}
        </Typography>
        <Typography
          align="center"
          gutterBottom
        >
          <strong>예금주 : </strong>{bankAccount.name}
        </Typography>
      </Fragment>
    );
  }
}
export default withStyles(styles)(Bank);
