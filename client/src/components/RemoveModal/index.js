import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import withMobileDialog from '@material-ui/core/withMobileDialog';

const styles = theme => ({
  title: {
    fontSize: 20,
  },
  root: {
    padding: theme.spacing.unit * 4,
  },
});
class RemoveModal extends React.Component {
  render() {
    const {
      open,
      onClose,
      classes,
      handleRemove,
      fullScreen,
    }  = this.props;
    return (
      <Dialog
        fullScreen={fullScreen}
        aria-labelledby="remove_layout"
        aria-describedby="remove_layout_description"
        open={open}
        onClose={onClose}
      >
        <div className={classes.root}>
          <Typography
            className={classes.title}
            align="center"
            gutterBottom
          >
            정말로 삭제합니까?
          </Typography>
          <Button
            color="primary"
            variant="raised"
            size="large"
            fullWidth
            onClick={handleRemove}
          >
            네
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
export default withMobileDialog()(withStyles(styles)(RemoveModal));