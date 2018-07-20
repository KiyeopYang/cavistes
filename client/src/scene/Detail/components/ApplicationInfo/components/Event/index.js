import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = {
  title: {
    fontSize: 20,
  },
  button: {
    marginTop: '15px',
  },
  text: {
    whiteSpace: 'pre-line',
  },
};
class Event extends React.Component {
  render() {
    const {
      classes,
      event,
    }  = this.props;
    let datetimeText = '';
    event.datetimes.forEach((o) => {
      const year = o.getUTCFullYear();
      const month = o.getMonth() + 1;
      const date = o.getDate();
      const hour = o.getHours();
      const min = o.getMinutes();
      datetimeText = datetimeText.concat(
        `${year}년 ${month}월 ${date}일 ${hour}시 ${min}분\n`
      );
    });
    return (
      <Fragment>
        <Typography>
          <strong>강의명</strong>
        </Typography>
        <Typography gutterBottom>{event.title}</Typography>
        <Typography>
          <strong>시각</strong>
        </Typography>
        <Typography
          className={classes.text}
          gutterBottom
        >
          {datetimeText}
        </Typography>
        <Typography>
          <strong>장소</strong>
        </Typography>
        <Typography gutterBottom>{`${event.shop.location} ${event.shop.locationDetail}`}</Typography>
        <Typography>
          <strong>가격</strong>
        </Typography>
        <Typography gutterBottom>{event.price}원</Typography>
        <Typography>
          <strong>환불 규정</strong>
        </Typography>
        <Typography className={classes.text} gutterBottom>
          {event.refundRule}
        </Typography>
      </Fragment>
    );
  }
}
export default withStyles(styles)(Event);
