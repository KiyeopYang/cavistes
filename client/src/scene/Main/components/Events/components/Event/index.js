import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import IconEvent from '@material-ui/icons/Event';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Pic from './components/Pic';
import Content from './components/Content';

const styles = theme => ({
  root: {
    display: 'flex',
    height: 300,
    marginBottom: 30,
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      flexDirection: 'column',
    },
    background: 'white',
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
    return (
      <Card raised className={classes.root}>
        <Pic
          handleClick={handleClick}
          images={event.images}
        />
        <Content
          handleCalendar={handleCalendar}
          datetimes={event.datetimes}
          handleClick={handleClick}
          event={event}
        />
      </Card>
    )
  }
}
export default withStyles(styles)(Event);
