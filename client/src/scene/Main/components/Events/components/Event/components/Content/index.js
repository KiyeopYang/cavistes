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
    overflowY: 'auto',
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: theme.spacing.unit ,
      maxHeight: 400,
    },
  },
  title: {
    fontSize: 24,
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },
  paragraph: {
    whiteSpace: 'pre-line',
    fontSize: 18,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  subHeadings: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  subHeading: {
    fontSize: 18,
    display: 'flex',
    minWidth: 200,
    [theme.breakpoints.down('sm')]: {
      width: '50%',
      fontSize: 16,
      minWidth: 0,
    },
  },
  redText: {
    color: '#CF0F0F',
  },
  greyText: {
    color: '#9C9C9C',
  },
  upperBlock: {
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
  header: {
    background: theme.palette.primary.main,
    padding: 4,
    display: 'flex',
  },
  title2: {
    color: 'white',
    cursor: 'pointer',
    flexGrow: 1,
    display: 'flex',
  },
});
class Content extends React.Component {
  render() {
    const {
      classes,
      handleClick,
      handleCalendar,
      datetimes,
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
          <div className={classes.subHeadings}>
            <Typography
              className={classNames(classes.redText, classes.subHeading)}
              variant="subheading"
              gutterBottom
              onClick={() => handleCalendar(datetimes)}
            >
              <IconEvent className={classes.smallIcon}/>
              <strong>
              {
                `${
                  datetimes[0].getUTCFullYear()
                  }/${
                datetimes[0].getMonth()+1
                  }/${
                  datetimes[0].getDate()
                  }`
              }
              </strong>
            </Typography>
            <Typography className={classNames(classes.redText, classes.subHeading)} variant="subheading" gutterBottom>
              <IconMap className={classes.smallIcon}/><strong>{event.shop.name}</strong>
            </Typography>
          </div>
          <div className={classes.subHeadings}>
            <Typography className={classNames(classes.redText, classes.subHeading)} variant="subheading" gutterBottom>
              <IconPrice className={classes.smallIcon}/><strong>{`${event.price}원`}</strong>
            </Typography>
            <Typography className={classNames(classes.redText, classes.subHeading)} variant="subheading" gutterBottom>
              <IconGroup className={classes.smallIcon}/>
              <strong>
              {
                `${event.attendees.length}/${event.maxPeople}명`
              }
              </strong>
            </Typography>
          </div>
        </div>
        <div>
          <Typography
            className={classNames(classes.paragraph, classes.greyText)}
            noWrap
            gutterBottom
          >
            {event.subTitle}
          </Typography>
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(Content);
// {/*<div className={classes.header}>*/}
//   {/*<Typography*/}
//     {/*className={classes.title2}*/}
//     {/*variant="subheading"*/}
//     {/*onClick={() => handleCalendar(datetimes)}*/}
//   {/*>*/}
//     {/*<IconEvent style={{ marginRight: 3 }}/>*/}
//     {/*{*/}
//       {/*`${*/}
//         {/*datetimes[0].getUTCFullYear()*/}
//         {/*}/${*/}
//       {/*datetimes[0].getMonth()+1*/}
//         {/*}/${*/}
//         {/*datetimes[0].getDate()*/}
//         {/*}`*/}
//     {/*}*/}
//   {/*</Typography>*/}
//   {/*{*/}
//     {/*// replyNum > 0 ?*/}
//     {/*//   <Typography className={classes.reply}*/}
//     {/*//               variant="subheading">*/}
//     {/*//     <IconChat style={{ marginRight: 3 }}/>*/}
//     {/*//     {replyNum}*/}
//     {/*//   </Typography> : null*/}
//   {/*}*/}
// {/*</div>*/}