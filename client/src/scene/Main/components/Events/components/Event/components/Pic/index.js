import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import IconEvent from '@material-ui/icons/Event';

const styles = theme => ({
  root: {
    width: 300,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  header: {
    background: theme.palette.primary.main,
    padding: 4,
  },
  title: {
    color: 'white',
    display: 'flex',
    cursor: 'pointer',
  },
  img: {
    width: 270,
    height: 'auto',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
});
class Pic extends React.Component {
  render() {
    const {
      classes,
      handleCalendar,
      handleClick,
    } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography
            className={classes.title}
            variant="subheading"
            onClick={handleCalendar}
          >
            <IconEvent style={{ marginRight: 3 }}/>
            2018/12/30
          </Typography>
        </div>
        <img
          className={classes.img}
          src="one.jpg"
          onClick={handleClick}
        />
      </div>
    )
  }
}
export default withStyles(styles)(Pic);
