import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import IconPerson from '@material-ui/icons/Person';
import IconDelete from '@material-ui/icons/Delete';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  reply: {
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    display: 'flex',
  },
  replyUser: {
    display: 'flex',
  },
  text: {
    whiteSpace: 'pre-line',
  },
  left: {
    flexGrow: 1,
  },
  deleteButton: {
    display: 'flex',
    justfiyContent: 'center',
    alignItems: 'center',
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
      <Paper className={classes.reply}>
        <div className={classes.left}>
          <Typography className={classes.replyUser}>
            <IconPerson/>
            <strong>{name}</strong>
          </Typography>
          <Typography variant="body2">
            {dateToString(new Date(datetime))}
          </Typography>
          <Typography variant="body2" className={classes.text}>
            {text}
          </Typography>
        </div>
        {
          handleRemove ?
            <div className={classes.deleteButton}>
              <IconButton
                color="primary"
                onClick={handleRemove}
              >
                <IconDelete/>
              </IconButton>
            </div> : null
        }
      </Paper>
    );
  }
}
export default withStyles(styles)(Text);
