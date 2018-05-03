import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import IconEvent from '@material-ui/icons/Event';
import IconPrice from '@material-ui/icons/AttachMoney';
import IconMap from '@material-ui/icons/Map';
import IconGroup from '@material-ui/icons/Group';

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
    display: 'flex',
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
  smallIcon: {
    marginRight: theme.spacing.unit,
  },
  icon: {
    marginRight: theme.spacing.unit,
    fontSize: 30,
  },
  iconTextWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
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
            <IconPrice className={classes.smallIcon}/><strong>{`참가비 ${event.price}원`}</strong>
          </Typography>
          <Typography className={classNames(classes.redText, classes.subHeading)} variant="subheading" gutterBottom>
            <IconMap className={classes.smallIcon}/><strong>{event.shop.name}</strong>
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
        <div className={classes.iconTextWrapper}>
          <Typography
            variant="headline"
            align="right"
            className={classes.redText}
            style={{flexGrow: 1}}
          >
            {
              `${event.attendees.length}/${event.maxPeople}명`
            }
          </Typography>
          <IconGroup color="primary" className={classes.icon}/>

        </div>
      </div>
    )
  }
}
export default withStyles(styles)(Content);
