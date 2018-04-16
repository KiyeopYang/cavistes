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
    } = this.props;
    return (
      <div className={classes.root}>
        <Pic
          handleCalendar={handleCalendar}
          handleClick={handleClick}
        />
        <Content handleClick={handleClick}/>
      </div>
    )
  }
}
export default withStyles(styles)(Event);
