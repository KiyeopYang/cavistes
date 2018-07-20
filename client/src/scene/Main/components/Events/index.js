import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import IconEvent from '@material-ui/icons/Event';
import Event from './components/Event';

const styles = theme => ({
  events: {
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      padding: 10,
    },
  },
  selectedDate: {
    background: '#006edc',
    color: 'white',
  },
  titleWrapper: {
    textAlign: 'right',
  },
  eventFlex: {
    flex: '1 0 33%',
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    margin: 4,
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
        <div className={classes.titleWrapper}>
          {
            createMode ?
                <Button
                  className={classes.button}
                  color="primary"
                  onClick={onClickCreate}
                >
                  <CreateIcon/>
                  생성
                </Button>
              : null
          }
        </div>
        <div className={classes.events}>
          {
            eventList.map((o, i) => (
              <div
                key={i}
                className={classes.eventFlex}
              >
                <Event
                  event={o}
                  handleCalendar={handleCalendar}
                  handleClick={() => handleClick(o.id)}
                />
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(Events);
