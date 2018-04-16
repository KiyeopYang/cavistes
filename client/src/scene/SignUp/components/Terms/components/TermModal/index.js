import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle } from 'material-ui/Dialog';

const styles = theme => ({
  titleWrapper: {
    background: theme.palette.primary.main,
  },
  title: {
    color: theme.palette.primary.contrastText,
    fontSize: 24,
  },
  content: {
    whiteSpace: 'pre-line',
    maxHeight: 600,
    overflowY: 'scroll',
    border: '1px solid grey',
    padding: theme.spacing.unit,
  },
});
class TermModal extends React.Component {
  render() {
    const {
      classes,
      open,
      onClose,
      title,
      content,
    }  = this.props;
    return (
      <Dialog
        aria-labelledby="termModal"
        aria-describedby="termModal_description"
        open={open}
        onClose={onClose}
      >
        <DialogTitle
          className={classes.titleWrapper}
        >
          <Typography className={classes.title}>
            { title }
          </Typography>
        </DialogTitle>
        <div className={classes.content}>
          <Typography>
            { content }
          </Typography>
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
export default withStyles(styles)(TermModal);
