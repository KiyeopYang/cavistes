import React from 'react';
import { withStyles } from 'material-ui/styles';
import Calendar from 'react-calendar';

const styles = theme => ({
  selectedDate: {
    background: theme.palette.primary.main,
    color: 'white',
  },
});
class EventCalendar extends React.Component {
  included = (date) => {
    const { events } = this.props;
    for (let i = 0; i < events.length; i += 1) {
      const obj = events[i];
      if (obj && obj.getDate() === date.getDate() && obj.getMonth() === date.getMonth()) {
        return true;
      }
    }
    return false;
  };
  render() {
    const { classes, events, ...rest } = this.props;
    return (
      <Calendar
        value={events[0]}
        tileClassName={
          ({ date, view }) =>
            view === 'month' &&
            this.included(date) ? classes.selectedDate : null
        }
        {...rest}
      />
    )
  }
}
export default withStyles(styles)(EventCalendar);
