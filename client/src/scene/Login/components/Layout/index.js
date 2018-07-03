import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4,
  },
  dialog: {
    maxWidth: 400,
  },
  divider: {
    width: '100%',
    height: 1,
    marginTop: 16,
    marginBottom: 16,
    background: 'grey',
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
      handlePasswordFind
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
          <div className={classes.divider} />
          <Button
            onClick={handlePasswordFind}
          >
            비밀번호 찾기
          </Button>
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