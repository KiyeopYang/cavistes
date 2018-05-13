import React from 'react';
import { withStyles } from 'material-ui/styles';
import Dialog, { withMobileDialog } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    // padding: theme.spacing.unit * 4,
    [theme.breakpoints.up('sm')]: {
      width: 600,
    },
  },
  paper: {
    overflow: 'auto',
    overflowX: 'hidden',
  },
});
class Layout extends React.Component {
  render() {
    const {
      classes,
      open,
      onClose,
      children,
      fullScreen,
    } = this.props;
    return (
      <Dialog
        classes={{ paper: classes.paper }}
        fullScreen={fullScreen}
        aria-labelledby="login_layout"
        aria-describedby="login_layout_description"
        open={open}
        onClose={onClose}
      >
        <div className={classes.root}>
          { children }
        </div>
        {
          fullScreen ?
            <Button
              color="primary"
              onClick={onClose}
              size="large"
            >
              닫기
            </Button> : null
        }
      </Dialog>
    );
  }
}

export default withMobileDialog()(withStyles(styles)(Layout));