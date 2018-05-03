import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    width: 600,
    margin: 'auto',
    minHeight: 500,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      minHeight: 'auto',
    },
  },
});
class Layout extends React.Component {
  render() {
    const { classes, children } = this.props;
    return (
      <div className={classes.root}>
        {children}
      </div>
    );
  }
}
export default withStyles(styles)(Layout);
