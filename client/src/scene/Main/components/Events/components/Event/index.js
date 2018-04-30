import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Pic from './components/Pic';
import Content from './components/Content';

const styles = theme => ({
  root: {
    display: 'flex',
    height: 300,
    marginBottom: 30,
    [theme.breakpoints.down('sm')]: {
      display: 'initial',
      height: 'auto',
    },
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
    return (
      <div className={classes.root}>
        <Pic
          handleCalendar={handleCalendar}
          handleClick={handleClick}
          datetimes={event.datetimes}
          images={event.images}
          replyNum={event.reply.length}
        />
        <Content
          handleClick={handleClick}
          event={event}
        />
      </div>
    )
  }
}
export default withStyles(styles)(Event);
