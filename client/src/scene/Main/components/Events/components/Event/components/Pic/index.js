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
      datetimes,
      images,
    } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography
            className={classes.title}
            variant="subheading"
            onClick={() => handleCalendar(datetimes)}
          >
            <IconEvent style={{ marginRight: 3 }}/>
            {
              `${
                datetimes[0].getUTCFullYear()
                }/${
                datetimes[0].getMonth()+1
                }/${
                datetimes[0].getDate()
                }`
            }
          </Typography>
        </div>
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
