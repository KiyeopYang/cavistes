import React, { Fragment } from 'react';
import classNames from 'classnames';
import Iframe from 'react-iframe';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import {
  FormControl,
  FormHelperText,
  FormControlLabel,
  FormLabel,
} from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Select from 'material-ui/Select';
import LocationMapFinder from '../../../../components/LocationMapFinder';

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
