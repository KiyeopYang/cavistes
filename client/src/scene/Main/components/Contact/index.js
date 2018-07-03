import React from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    background: theme.palette.secondary.main,
  },
  form: {
    padding: 20,
    width: '100%',
    maxWidth: 500,
    margin: 'auto',
  },
  whiteText: {
    color: 'white',
  },
  greyText: {
    color: '#898989',
  },
  title: {
    fontSize: 20,
  },
  whiteForm: {
    background: 'white',
  },
  field: {
    width: '100%',
  },
  textFieldRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  textFieldInput: {
    backgroundColor: theme.palette.common.white,
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
  },
  textFieldFormLabel: {
    fontSize: 18,
  },
  button: {
    marginTop: 14,
  },
});
class Contact extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.form}>
          <Typography
            className={classNames(classes.whiteText, classes.title)}
          >
            <strong>Contact</strong>
          </Typography>
          <Typography
            className={classNames(classes.greyText)}
            gutterBottom
          >
            카비스트에 문의할 사항을 적어주십시요.
          </Typography>
          <TextField
            className={classes.field}
            defaultValue=""
            placeholder="이메일"
            id="email_input"
            InputProps={{
              disableUnderline: true,
              classes: {
                root: classes.textFieldRoot,
                input: classes.textFieldInput,
              },
            }}
            InputLabelProps={{
              shrink: true,
              className: classes.textFieldFormLabel,
            }}
          />
          <TextField
            className={classes.field}
            defaultValue=""
            placeholder="전화번호"
            id="phone_input"
            InputProps={{
              disableUnderline: true,
              classes: {
                root: classes.textFieldRoot,
                input: classes.textFieldInput,
              },
            }}
            InputLabelProps={{
              shrink: true,
              className: classes.textFieldFormLabel,
            }}
          />
          <TextField
            className={classes.field}
            multiline
            defaultValue=""
            placeholder="내용"
            id="content_input"
            InputProps={{
              disableUnderline: true,
              classes: {
                root: classes.textFieldRoot,
                input: classes.textFieldInput,
              },
            }}
            InputLabelProps={{
              shrink: true,
              className: classes.textFieldFormLabel,
            }}
          />
          <Button
            className={classes.button}
            fullWidth
            color="primary"
            variant="raised"
          >
            문의
          </Button>
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(Contact);
