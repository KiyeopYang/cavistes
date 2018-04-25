import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    width: 700,
    padding: 20,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: 0,
    },
  },
  title: {
    fontSize: 24,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  paragraph: {
    whiteSpace: 'pre-line',
    fontSize: 18,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  subHeading: {
    fontSize: 18,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  redText: {
    color: '#CF0F0F',
  },
  greyText: {
    color: '#9C9C9C',
  },
  upperBlock: {
    height: 100,
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
  },
});
class Content extends React.Component {
  render() {
    const {
      classes,
      handleClick,
      event,
    } = this.props;
    return (
      <div className={classes.root}>
        <div
          className={classes.upperBlock}
          onClick={handleClick}
        >
          <Typography className={classes.title} gutterBottom>
            <strong>{event.title}</strong>
          </Typography>
          <Typography className={classNames(classes.redText, classes.subHeading)} variant="subheading" gutterBottom>
            <strong>{`참가비 ${event.price}원`}</strong>
          </Typography>
          <Typography className={classNames(classes.redText, classes.subHeading)} variant="subheading" gutterBottom>
            <strong>{event.shop.name}</strong>
          </Typography>
        </div>
        <div style={{ height: 130, overflowY: 'scroll' }}>
          <Typography
            className={classNames(classes.paragraph, classes.greyText)}
            noWrap
            gutterBottom
          >
            {event.subTitle}
          </Typography>
        </div>
        <div style={{ height: 50 }}>
          <Typography
            variant="headline"
            align="right"
            className={classes.redText}
            gutterBottom
          >
            {
              `${event.attendees.length}/${event.maxPeople}명 신청`
            }
          </Typography>
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(Content);
