import React from 'react';
import { withStyles } from 'material-ui/styles';
import Dialog, { withMobileDialog } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4,
  },
  dialog: {
    maxWidth: 400,
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
        fullScreen={fullScreen}
        aria-labelledby="login_layout"
        aria-describedby="login_layout_description"
        open={open}
        onClose={onClose}
        maxWidth="xs"
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
              취소
            </Button> : null
        }
      </Dialog>
    );
  }
}

export default withMobileDialog()(withStyles(styles)(Layout));