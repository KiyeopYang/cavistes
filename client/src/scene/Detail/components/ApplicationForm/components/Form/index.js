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
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name.replace(/\s/g,''),
      phone: this.props.user.phone,
    };
  }
  handleChange = name => e => {
    let value = e.target.value;
    if (name === 'name') {
      value = value.replace(/\s/g,'');
    }
    this.setState({
      [name]: value,
    });
  }
  handleSubmit = () => {
    this.props.handleSubmit(this.state);
  };
  render() {
    const {
      classes,
      handleNext,
      event,
    }  = this.props;
    const {
      name,
      phone,
    } = this.state;
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
        <Typography
          className={classes.title}
          align="center"
          gutterBottom
        >
          다음 사항이 맞는 지 확인 해 주십시요.
        </Typography>
        <form>
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
          <TextField
            label="신청자 이름 (입금자명)"
            helperText="공백이 있으면 안됩니다."
            fullWidth
            margin="dense"
            onChange={this.handleChange('name')}
            value={name}
          />
          <TextField
            label="신청자 전화번호"
            fullWidth
            margin="dense"
            onChange={this.handleChange('phone')}
            value={phone}
          />
          <Button
            type="submit"
            className={classes.button}
            fullWidth
            color="primary"
            variant="raised"
            size="large"
            onClick={(e) => {
              e.preventDefault();
              handleNext({ name, phone });
            }}
          >
            확인
          </Button>
        </form>
      </Fragment>
    );
  }
}
export default withStyles(styles)(Form);
