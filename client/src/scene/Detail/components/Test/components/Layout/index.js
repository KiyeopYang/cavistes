import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  children: {
    maxWidth: 1000,
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
