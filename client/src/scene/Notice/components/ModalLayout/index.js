import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4,
    [theme.breakpoints.up('md')]: {
      minWidth: 600,
    },
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
        maxWidth="md"
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