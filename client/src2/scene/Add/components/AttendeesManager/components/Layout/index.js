import React from 'react';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogTitle, DialogContent, withMobileDialog } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  title: {
    background: theme.palette.primary.main,
    padding: theme.spacing.unit * 2,
  },
  titleText: {
    color: theme.palette.primary.contrastText,
    fontSize: 16,
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
      title,
    } = this.props;
    return (
      <Dialog
        fullScreen={fullScreen}
        aria-labelledby="login_layout"
        aria-describedby="login_layout_description"
        open={open}
        onClose={onClose}
      >
        <DialogTitle
          className={classes.title}
        >
          <Typography className={classes.titleText}>
          {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          { children }
        </DialogContent>
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