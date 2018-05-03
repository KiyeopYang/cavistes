import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = {
  root: {
    width: '100%',
    textAlign: 'right',
  }
};
const i = ({ classes, onClick }) => (
  <div className={classes.root}>
    <Button color="primary" onClick={onClick}>생성</Button>
  </div>
);
export default withStyles(styles)(i);
