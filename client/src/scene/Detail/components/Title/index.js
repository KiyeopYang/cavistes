import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import IconEvent from '@material-ui/icons/Event';
import IconPrice from '@material-ui/icons/AttachMoney';
import IconMap from '@material-ui/icons/Map';
import IconGroup from '@material-ui/icons/Group';

const styles = theme => ({
  root: {
    width: '100%',
  },
  titleWrapper: {
    background: theme.palette.primary.main,
  },
  title: {
    color: 'white',
    fontSize: 24,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
  paragraph: {
    fontSize: 18,
    whiteSpace: 'pre-line',
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
  subHeading: {
    display: 'flex',
    color: '#CF0F0F',
    fontSize: 18,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
  greyText: {
    color: '#9C9C9C',
  },
  divider: {
    width: '100%',
    height: 1,
    background: 'grey',
  },
});
function makeDateText(date) {
  return `${date.getUTCFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
}
class Title extends React.Component {
  render() {
    const { classes, event } = this.props;
    let dateText = makeDateText(event.datetimes[0]);
    if (event.datetimes.length > 1) {
      dateText = `${dateText}부터 ${event.datetimes.length}회`;
    }
    return (
      <div className={classes.root}>
        <div className={classes.titleWrapper}>
          <Typography className={classes.title} gutterBottom>
            <strong>{event.title}ss</strong>
          </Typography>
        </div>
        <div className={classes.divider}/>
        <div>
          <Typography className={classes.subHeading} gutterBottom>
            <IconEvent className={classes.icon}/><strong>{dateText}</strong>
          </Typography>
          <Typography className={classes.subHeading} gutterBottom>
            <IconPrice className={classes.icon}/><strong>참가비 {event.price}원</strong>
          </Typography>
          <Typography className={classes.subHeading} gutterBottom>
            <IconMap className={classes.icon}/><strong>{event.shop.name}</strong>
          </Typography>
          <Typography className={classes.subHeading} gutterBottom>
            <IconGroup className={classes.icon}/>
            <strong>{event.attendees.length}/{event.maxPeople}명</strong>
          </Typography>
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(Title);
