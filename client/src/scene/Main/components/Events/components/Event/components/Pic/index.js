import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import IconEvent from '@material-ui/icons/Event';
import IconChat from '@material-ui/icons/Chat';

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
    display: 'flex',
  },
  title: {
    color: 'white',
    cursor: 'pointer',
    flexGrow: 1,
    display: 'flex',
  },
  reply: {
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
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
      replyNum,
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
          {
            replyNum > 0 ?
              <Typography className={classes.reply}
                          variant="subheading">
                <IconChat style={{ marginRight: 3 }}/>
                {replyNum}
              </Typography> : null
          }
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
