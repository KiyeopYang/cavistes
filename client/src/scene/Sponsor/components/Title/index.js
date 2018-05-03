import React from 'react';
import { withStyles } from 'material-ui/styles';
import Text from 'material-ui/Typography';

const styles = {};
const i = ({ classes, text }) => (
  <Text variant="headline">
    {text}
  </Text>
);
export default withStyles(styles)(i);
