import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4,
  },
  clearBar: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  clearBarFlex: {
    flex: 1,
  },
  iconButton: {
    margin: theme.spacing.unit,
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
      >
        <div className={classes.clearBar}>
          <div className={classes.clearBarFlex} />
          <IconButton onClick={onClose}>
            <ClearIcon color="primary" className={classes.iconButton}/>
          </IconButton>
        </div>
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