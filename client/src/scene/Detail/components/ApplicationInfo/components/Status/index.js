import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

const styles = {
  title: {
    fontSize: 20,
  },
  login: {
    marginTop: 16,
  },
};
class Status extends React.Component {
  render() {
    const {
      classes,
      status,
      nameForPayment,
      price,
    } = this.props;
    return (
      <Fragment>
        <Typography>
          입금자명 : {nameForPayment}
        </Typography>
        <Typography>
          금액 : {price}
        </Typography>
        <Typography
          variant="title"
          align="center"
          gutterBottom
        >
          <strong>현재 상태 : </strong>{status}
        </Typography>
      </Fragment>
    );
  }
}
export default withStyles(styles)(Status);
