import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = {
  children: {
    maxWidth: 750,
    margin: 'auto',
  },
};
class Layout extends React.Component {
  render() {
    const { classes, children } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.children}>
          {children}
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(Layout);
