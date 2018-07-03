import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  title: {
    fontSize: 20,
  },
});
class Form extends React.Component {
  render() {
    const {
      classes,
      handleRemove,
    }  = this.props;
    return (
      <Fragment>
        <Typography
          className={classes.title}
          align="center"
          gutterBottom
        >
          정말로 탈퇴합니까?
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
      </Fragment>
    );
  }
}
export default withStyles(styles)(Form);
