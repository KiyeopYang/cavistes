import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Event from './components/Event';

const styles = theme => ({
  title: {
    padding: 10,
  },
  events: {
    [theme.breakpoints.down('sm')]: {
      padding: 10,
    },
  },
  selectedDate: {
    background: '#006edc',
    color: 'white',
  },
});
class Events extends React.Component {
  render() {
    const {
      classes,
      handleCalendar,
      handleClick,
    } = this.props;
    return (
      <div>
        <Typography className={classes.title} variant="headline">Event</Typography>
        <div className={classes.events}>
          {
            Array.apply(null, { length: 5 }).map((o, i) => (
              <Event
                key={i}
                handleCalendar={handleCalendar}
                handleClick={handleClick}
              />
            ))
          }
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(Events);
