import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import prefixer from '../../../../../../modules/prefixer';

const styles = theme => prefixer({
  buttonAlign: {
    textAlign: 'center',
  },
});
class Opening extends React.Component {
  render() {
    const {
      classes,
    } = this.props;
    return (
      <React.Fragment>
        <Typography>
          I made this for help myself to do PE steadily.
        </Typography>
        <Typography>
          I hope it can help you too.
        </Typography>
        <div className={classes.buttonAlign}>
          <Button>
            Next
          </Button>
        </div>
      </React.Fragment>
    )
  }
}
export default withStyles(styles, { withTheme: true })(Opening);
