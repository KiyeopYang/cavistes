import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Dialog, { withMobileDialog } from 'material-ui/Dialog';

const styles = theme => ({
  wrapper: {
    width: '100%',
  },
  root: {
    padding: theme.spacing.unit * 4,
  },
});
class Layout extends React.Component {
  render() {
    const {
      open,
      onClose,
      classes,
      fullScreen,
      children,
    } = this.props;
    return (
      <Dialog
        fullScreen={fullScreen}
        aria-labelledby="login_layout"
        aria-describedby="login_layout_description"
        open={open}
        onClose={onClose}
      >
        <div className={classes.root}>
          { children }
        </div>
      </Dialog>
    )
  }
}
export default withMobileDialog()(withStyles(styles)(Layout));
