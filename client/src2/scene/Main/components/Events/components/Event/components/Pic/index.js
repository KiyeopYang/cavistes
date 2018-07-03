import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import IconEvent from '@material-ui/icons/Event';
import IconChat from '@material-ui/icons/Chat';

const styles = theme => ({
  root: {
    width: 300,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    background: theme.palette.primary.main,
    padding: 4,
    display: 'flex',
  },
  title: {
    color: 'white',
    cursor: 'pointer',
    flexGrow: 1,
    display: 'flex',
  },
  reply: {
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
  },
  img: {
    width: 'auto',
    height: 300,
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 'auto',
    },
  },
});
class Pic extends React.Component {
  render() {
    const {
      classes,
      handleCalendar,
      handleClick,
      datetimes,
      images,
      replyNum,
    } = this.props;
    return (
      <div className={classes.root}>
        <img
          className={classes.img}
          src={images[0].path}
          onClick={handleClick}
        />
      </div>
    )
  }
}
export default withStyles(styles)(Pic);
