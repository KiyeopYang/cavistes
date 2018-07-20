import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    // padding: theme.spacing.unit * 4,
    [theme.breakpoints.up('md')]: {
      width: 400,
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
        <Button
          color="primary"
          onClick={onClose}
          size="large"
        >
          닫기
        </Button>
      </Dialog>
    );
  }
}

export default withMobileDialog()(withStyles(styles)(Layout));