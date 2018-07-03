import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import CreateIcon from '@material-ui/icons/Create';
import IconEvent from '@material-ui/icons/Event';
import Event from './components/Event';

const styles = theme => ({
  title: {
    padding: 10,
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
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
  titleWrapper: {
    display: 'flex',
  },
  titleIcon: {
    fontSize: 28,
    marginRight: theme.spacing.unit,
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
          <Typography className={classes.title} variant="headline">
            <IconEvent className={classes.titleIcon}/>Event
          </Typography>
          {
            createMode ?
                <Button
                  color="primary"
                  onClick={onClickCreate}
                >
                  <CreateIcon/>
                  이벤트 생성
                </Button>
              : null
          }
        </div>
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
