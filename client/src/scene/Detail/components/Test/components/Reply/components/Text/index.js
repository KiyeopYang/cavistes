import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import IconPerson from '@material-ui/icons/AccountCircle';
import IconDelete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import Hidden from '@material-ui/core/Hidden';

const styles = theme => ({
  reply: {
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    display: 'flex',
  },
  replyUser: {
    display: 'inline-block',
    marginRight: 8,
    color: theme.palette.primary.main,
  },
  text: {
    whiteSpace: 'pre-line',
  },
  left: {
    flexGrow: 1,
    display: 'flex',
  },

  icon: {
    color: theme.palette.primary.main,
    fontSize: 36,
    marginRight: 8,
  },
  datetime: {
    display: 'inline-block',
    color: 'gray',
    fontSize: 11,
  },
  body: {
    width: '100%',
  },
});
function dateToString(date) {
  const year = date.getUTCFullYear();
  const month = date.getMonth()+1;
  const dates = date.getDate();
  const hours = date.getHours();
  const mins = date.getMinutes();
  return `${year}년 ${month}월 ${dates}일 ${hours}시 ${mins}분`;
}
class Text extends React.Component {
  render() {
    const {
      classes,
      name,
      email,
      text,
      datetime,
      handleRemove,
    } = this.props;
    return (
      <div
        className={classes.reply}
      >
        <div className={classes.left}>
          <Hidden smDown>
            <IconPerson
              className={classes.icon}
            />
          </Hidden>
          <div className={classes.body}>
            <div>
              <Typography className={classes.replyUser}>
                <strong>{name}</strong>
              </Typography>
              <Typography className={classes.datetime}>
                {dateToString(new Date(datetime))}
              </Typography>
            </div>
            <Typography className={classes.text}>
              {text}
            </Typography>
          </div>
        </div>
        {
          handleRemove ?
            <div>
              <IconButton
                color="primary"
                onClick={handleRemove}
              >
                <IconDelete/>
              </IconButton>
            </div> : null
        }
      </div>
    );
  }
}
export default withStyles(styles)(Text);
