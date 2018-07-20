import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';

import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    height: 590,
    width: 320,
    borderRadius: 0,
    marginBottom: 20,
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      flexDirection: 'column',
    },
  },
  media: {
    height: 205,
    paddingTop: '64%',
    cursor: 'pointer',
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  subTitle: {
    display: 'flex',
    marginBottom: 4,
  },
  label: {
    marginRight: 12,
    width: 30,
  },
  horLine: {
    height: 1,
    width: '100%',
    background: 'grey',
    marginTop: 12,
    marginBottom: 12,
  },
  content: {
    height: 283,
    overflow: 'auto',
  },
  button: {
    height: 35,
    width: 135,
    fontFamily: 'CircularBook',
    borderRadius: 0,
    letterSpacing: 2,
    margin: 'auto',
    marginTop: 25,
    marginBottom: 25,
  },
  selectable: {
    cursor: 'pointer',
  },
});
class Event extends React.Component {
  render() {
    const {
      classes,
      handleCalendar,
      handleClick,
      event,
    } = this.props;
    event.datetimes = event.datetimes.map(o => new Date(o));
    const datetimes = event.datetimes;
    const completed = event.attendees.filter(o=>o.status==='입금완료').length;
    const application = event.attendees.filter(o=>o.status==='입금대기').length;

    return (
      <Card
        className={classes.root}
        elevation={0}
      >
        <CardMedia
          className={classes.media}
          image={event.images[0].path}
          onClick={handleClick}
        />
        <CardContent className={classes.content}>
          <div
            className={classes.upperBlock}
          >
            <Typography className={classes.title}>
              <strong>{event.title}</strong>
            </Typography>
            <div className={classes.subTitle}>
              <Typography className={classes.label}>
                <strong>일정</strong>
              </Typography>
              <Typography
                className={classes.selectable}
                onClick={() => handleCalendar(datetimes)}
              >
                {
                  `${
                    datetimes[0].getUTCFullYear()
                    }.${
                  datetimes[0].getMonth()+1
                    }.${
                    datetimes[0].getDate()
                    }`
                }
                {
                  `${datetimes.length > 1 ? `부터 ${datetimes.length}회`: ''}`
                }
              </Typography>
            </div>
            <div className={classes.subTitle}>
              <Typography className={classes.label}>
                <strong>회비</strong>
              </Typography>
              <Typography>
                {`${event.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`}
              </Typography>
            </div>
            <div className={classes.subTitle}>
              <Typography className={classes.label}>
                <strong>장소</strong>
              </Typography>
              <Typography>
                {event.shop.name}
              </Typography>
            </div>
            <div className={classes.subTitle}>
              <Typography className={classes.label}>
                <strong>인원</strong>
              </Typography>
              <Typography>
                {
                  `${completed}/${event.maxPeople}명 (입금 대기:${application}명)`
                }
              </Typography>
            </div>
          </div>
          <div className={classes.horLine}/>
          <Typography component="p">
            {event.subTitle}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            className={classes.button}
            variant="raised"
            color="primary"
            onClick={handleClick}
          >
            MORE
          </Button>
        </CardActions>
      </Card>
    )
  }
}
export default withStyles(styles)(Event);
