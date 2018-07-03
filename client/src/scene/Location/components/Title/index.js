import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Text from '@material-ui/core/Typography';

const styles = {
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
};
const i = ({ classes, text }) => (
  <Text className={classes.title}>
    {text}
  </Text>
);
export default withStyles(styles)(i);
