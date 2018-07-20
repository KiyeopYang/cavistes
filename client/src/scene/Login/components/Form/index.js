import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';

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
  title: {
    fontSize: 32,
  },
  button: {
    marginTop: 16,
    borderRadius: 0,
  },
  titleImg: {
    width: 200,
  },
  titleImgWrapper: {
    background: 'white',
    height: 95,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  password: {
    fontFamily: 'sans-serif',
  },
  footer: {
    width: '100%',
    textAlign: 'center',
  },
  verticalDivider: {
    width: 1,
    height: 12,
    marginLeft: 8,
    marginRight: 8,
    background: 'grey',
    display: 'inline-block',
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
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      view: 'login',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.setState({
        view: 'login',
      });
    }
  }
  handleChange = name => e => this.setState({
    [name]: e.target.value,
  });
  disabled = () => {
    const { email, password } = this.state;
    return !email.length || !password.length;
  };
  handleSubmit = () => {
    this.props.handleSubmit(this.state);
  };
  handlePasswordFind = () => {
    this.props.handlePasswordFind(this.state.email);
  };
  render() {
    const {
      classes,
      open,
      onClose,
      fullScreen,
    }  = this.props;
    const {
      email,
      password,
      view,
    } = this.state;
    return (
      <Dialog
        fullScreen={fullScreen}
        aria-labelledby="login_layout"
        aria-describedby="login_layout_description"
        open={open}
        onClose={onClose}
        maxWidth="xs"
      >
        <div className={classes.clearBar}>
          <div className={classes.clearBarFlex}/>
          <IconButton onClick={onClose}>
            <ClearIcon className={classes.iconButton}/>
          </IconButton>
        </div>
        <div className={classes.root}>
          <div className={classes.titleImgWrapper}>
            <img className={classes.titleImg} src="/title.PNG"/>
          </div>
          <form>
            <TextField
              label="이메일"
              fullWidth
              margin="dense"
              helperText={
                view === 'passwordFind' ? "가입하신 이메일로 비밀번호 변경 링크를 보내드립니다." : ''
              }
              onChange={this.handleChange('email')}
              value={email}
            />
            {
              view === 'passwordFind' ?
                <React.Fragment>
                  <Button
                    className={classes.button}
                    fullWidth
                    color="primary"
                    variant="raised"
                    size="large"
                    onClick={this.handlePasswordFind}
                  >
                    비밀번호 찾기
                  </Button>
                </React.Fragment> :
                <React.Fragment>
                  <TextField
                    InputProps={{
                      className: classes.password,
                    }}
                    label="비밀번호"
                    fullWidth
                    margin="dense"
                    type="password"
                    onChange={this.handleChange('password')}
                    value={password}
                  />
                  <Button
                    type="submit"
                    className={classes.button}
                    fullWidth
                    color="primary"
                    variant="raised"
                    size="large"
                    onClick={(e) => {
                      e.preventDefault();
                      this.handleSubmit(e);
                    }}
                    disabled={this.disabled()}
                  >
                    로그인
                  </Button>
                </React.Fragment>
            }
            <div className={classes.divider} />
            <div className={classes.footer}>
              {
                view !== 'passwordFind' ?
                  <Button
                    onClick={() => this.setState({
                      view: 'passwordFind',
                    })}
                  >
                    비밀번호 찾기
                  </Button> : null
              }
              {
                fullScreen ?
                  <React.Fragment>
                    {
                      view !== 'passwordFind' ?
                        <div className={classes.verticalDivider}/> : null
                    }
                    <Button
                      onClick={onClose}
                    >
                      취소
                    </Button>
                  </React.Fragment>
                  : null
              }
            </div>
          </form>
        </div>
      </Dialog>
    );
  }
}
export default withMobileDialog()(withStyles(styles)(Form));
