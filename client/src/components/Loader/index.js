import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  root: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0 , 0.5);',
    zIndex: 2000,
  },
};
function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <CircularProgress size={100} />
    </div>
  );
}

export default withStyles(styles)(CircularIndeterminate);
