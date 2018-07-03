import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import IconZoom from '@material-ui/icons/ZoomIn';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit,
  },
  titleWrapper: {
    background: theme.palette.primary.main,
    padding: 4,
  },
  title: {
    color: theme.palette.primary.contrastText,
    fontSize: 16,
    display: 'flex',
    cursor: 'pointer',
  },
  content: {
    whiteSpace: 'pre-line',
    maxHeight: 150,
    overflowY: 'scroll',
    border: '1px solid grey',
    padding: theme.spacing.unit,
  },
});
class Block extends React.Component {
  render() {
    const {
      classes,
      title,
      content,
      onZoom,
    }  = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.titleWrapper}>
          <Typography
            className={classes.title}
            onClick={onZoom}
          >
            {title}
            <IconZoom/>
          </Typography>
        </div>
        <div className={classes.content}>
          <Typography>{content}</Typography>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Block);
