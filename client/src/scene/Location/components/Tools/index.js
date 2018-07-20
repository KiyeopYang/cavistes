import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';

const styles = {
  root: {
    width: '100%',
    textAlign: 'right',
  }
};
const i = ({ classes, onClick }) => (
  <div className={classes.root}>
    <Button
      color="primary" onClick={onClick}><CreateIcon/>생성</Button>
  </div>
);
export default withStyles(styles)(i);
