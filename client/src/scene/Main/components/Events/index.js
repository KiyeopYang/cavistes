import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Event from './components/Event';

const styles = theme => ({
  title: {
    padding: 10,
  },
  buttonWrapper: {
    textAlign: 'center',
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
      onClickCreate,
      createMode,
      eventList,
    } = this.props;
    return (
      <div>
        <Typography className={classes.title} variant="headline">Event</Typography>
        {
          createMode ?
            <div className={classes.buttonWrapper}>
              <Button
                color="primary"
                variant="raised"
                onClick={onClickCreate}
              >
                생성하기
              </Button>
            </div> : null
        }
        <div className={classes.events}>
          {
            eventList.map((o, i) => (
              <Event
                key={i}
                event={o}
                handleCalendar={handleCalendar}
                handleClick={() => handleClick(o.id)}
              />
            ))
          }
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(Events);
