import React, { Fragment } from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  typeForm: {
    flexDirection: 'row',
  },
  wrapperOfTwoForm: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  oneOfTwoForm: {
    width: '50%',
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      display: 'block',
    },
  },
  leftOfTwoForm: {
    paddingRight: theme.spacing.unit * 2,
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
    },
  },
  rightOfTwoForm: {
    paddingLeft: theme.spacing.unit * 2,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
  birthForm: {
    width: '33.333333%',
    paddingRight: '3px',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '0px',
      width: '100%',
    },
  },
  signIn: {
    marginTop: 16,
  },
  password: {
    fontFamily: 'sans-serif',
  },
  titleImg: {
    width: 200,
  },
  titleImgWrapper: {
    background: 'white',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Form extends React.Component {
  constructor(props) {
    super(props);
    const now = new Date();
    const { user } = this.props;
    const userBirth = new Date(user.birth);
    this.state = {
      type: user.type,
      email: user.email,
      password: '',
      passwordCheck: '',
      name: user.name,
      phone: user.phone,
      gender: user.gender,
      work: user.work,
      house: user.house,
      birthYear: userBirth.getUTCFullYear(),
      birthYearInputs:
        Array.apply(null, { length: 100 }).map(Number.call, i => now.getUTCFullYear() - Number(i)),
      birthMonth: userBirth.getUTCMonth(),
      birthMonthInputs: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
      ],
      birthDate: userBirth.getDate(),
      level: user.level,
      isLocationMapFinderOpen: false,
      isPasswordConfirmed: false,
    };
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handlePasswordConfirm = () => {
    const { isPasswordCorrect } = this.props;
    isPasswordCorrect(this.state.password, () => {
      this.setState({
        isPasswordConfirmed: true,
        password: '',
      });
    }, () => {
      this.props.handleError('비밀번호가 맞지 않습니다.');
    });

    // if (this.state.password === this.props.user.password) {
    //   this.setState({
    //     isPasswordConfirmed: true,
    //   });
    // } else {
    //   this.props.handleError('비밀번호가 맞지 않습니다.');
    // }
  };
  handleModify = () => {
    const {
      type,
      name,
      phone,
      gender,
      birthYear,
      birthMonth,
      birthDate,
      work,
      house,
      password,
    } = this.state;
    this.props.handleModify({
      name,
      phone,
      gender,
      birth: new Date(birthYear, birthMonth, birthDate),
      type,
      work,
      house,
      password,
    });
  };
  render() {
    const {
      classes,
      handleExit,
      handleModify,
    } = this.props;
    const {
      type,
      email,
      password,
      passwordCheck,
      name,
      phone,
      gender,
      birthYear,
      birthYearInputs,
      birthMonth,
      birthMonthInputs,
      birthDate,
      work,
      house,
      level,
      isLocationMapFinderOpen,
      isPasswordConfirmed,
    } = this.state;

    const birthDateInputs = [];
    if (birthYear !== '' && birthMonth !== '') {
      const dateCalculator = new Date(birthYear, birthMonth, 1);
      dateCalculator.setDate(dateCalculator.getDate() - 1);
      const lastDate = dateCalculator.getDate();
      for (let i = 1; i <= lastDate; i += 1) {
        birthDateInputs.push(i);
      }
    }
    return (
      <Fragment>
        <div className={classes.titleImgWrapper}>
          <img className={classes.titleImg} src="/title.PNG"/>
        </div>
        <div>
          <FormControl
            required
            fullWidth
            margin="dense"
            disabled={!isPasswordConfirmed}
          >
            <InputLabel htmlFor="email">이메일</InputLabel>
            <Input id="email" value={email} onChange={this.handleChange('email')} />
          </FormControl>
          <div className={classes.wrapperOfTwoForm}>
            <div className={classNames(classes.leftOfTwoForm, classes.oneOfTwoForm)}>
              <FormControl
                required
                margin="dense"
                fullWidth
                disabled={!isPasswordConfirmed}
              >
                <InputLabel htmlFor="name">이름</InputLabel>
                <Input id="name" value={name} onChange={this.handleChange('name')} />
              </FormControl>
            </div>
            <div className={classNames(classes.rightOfTwoForm, classes.oneOfTwoForm)}>
              <FormControl
                required
                margin="dense"
                fullWidth
                disabled={!isPasswordConfirmed}
              >
                <InputLabel htmlFor="phone">전화번호</InputLabel>
                <Input id="phone" value={phone} onChange={this.handleChange('phone')} />
              </FormControl>
            </div>
          </div>
          {
            isPasswordConfirmed ?
              <div className={classes.wrapperOfTwoForm}>
                <div className={classNames(classes.leftOfTwoForm, classes.oneOfTwoForm)}>
                  <FormControl
                    required
                    margin="dense"
                    fullWidth
                  >
                    <InputLabel htmlFor="password">비밀번호 (8자 이상)</InputLabel>
                    <Input
                      id="password"
                      value={password}
                      onChange={this.handleChange('password')}
                      type="password"
                      className={classes.password}
                      disabled={!isPasswordConfirmed}
                    />
                  </FormControl>
                </div>
                <div className={classNames(classes.rightOfTwoForm, classes.oneOfTwoForm)}>
                  <FormControl
                    required
                    margin="dense"
                    fullWidth
                  >
                    <InputLabel htmlFor="passwordCheck">비밀번호 확인</InputLabel>
                    <Input
                      id="passwordCheck"
                      value={passwordCheck}
                      onChange={this.handleChange('passwordCheck')}
                      type="password"
                      className={classes.password}
                      disabled={!isPasswordConfirmed}
                    />
                  </FormControl>
                </div>
              </div> : null
          }
          <FormControl
            component="fieldset"
            required
            margin="dense"
            disabled={!isPasswordConfirmed}
          >
            <FormLabel component="legend">성별</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={gender}
              onChange={this.handleChange('gender')}
              className={classes.typeForm}
            >
              <FormControlLabel
                value="m"
                control={
                  <Radio
                    color="primary"
                  />
                }
                label="남성"
              />
              <FormControlLabel
                value="w"
                control={
                  <Radio
                    color="primary"
                  />
                }
                label="여성"
              />
            </RadioGroup>
          </FormControl>
          <FormControl
            fullWidth
            margin="dense"
          >
            <InputLabel htmlFor="work">직장</InputLabel>
            <Input
              id="work"
              value={work}
              onChange={this.handleChange('work')}
              disabled={!isPasswordConfirmed}
            />
          </FormControl>
          <FormControl
            fullWidth
            margin="dense"
          >
            <InputLabel htmlFor="house">주소</InputLabel>
            <Input
              id="house"
              value={house}
              onChange={this.handleChange('house')}
              disabled={!isPasswordConfirmed}
            />
          </FormControl>
          <FormControl
            margin="dense"
            fullWidth
            disabled={!isPasswordConfirmed}
          >
            <FormLabel component="legend">생년월일</FormLabel>
            <div>
              <FormControl
                className={classes.birthForm}
                margin="dense"
                disabled={!isPasswordConfirmed}
              >
                <InputLabel htmlFor="year">연도</InputLabel>
                <Select
                  onChange={this.handleChange('birthYear')}
                  native
                  value={birthYear}
                  input={<Input id="year" />}
                >
                  <option value="" />
                  {
                    birthYearInputs.map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))
                  }
                </Select>
              </FormControl>
              <FormControl
                className={classes.birthForm}
                margin="dense"
                disabled={!isPasswordConfirmed}
              >
                <InputLabel htmlFor="month">월</InputLabel>
                <Select
                  onChange={this.handleChange('birthMonth')}
                  native
                  value={birthMonth}
                  input={<Input id="month" />}
                >
                  <option value=""/>
                  {
                    birthMonthInputs.map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))
                  }
                </Select>
              </FormControl>
              <FormControl
                className={classes.birthForm}
                margin="dense"
                disabled={!isPasswordConfirmed}
              >
                <InputLabel htmlFor="date">일</InputLabel>
                <Select
                  onChange={this.handleChange('birthDate')}
                  native
                  value={birthDate}
                  input={<Input id="date" />}
                >
                  <option value="" />
                  {
                    birthDateInputs.map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))
                  }
                </Select>
              </FormControl>
            </div>
          </FormControl>
          <FormControl
            margin="dense"
            disabled
          >
            <InputLabel htmlFor="level">레벨</InputLabel>
            <Select
              onChange={this.handleChange('level')}
              native
              value={level}
              input={<Input id="level" />}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </Select>
          </FormControl>
          {
            !isPasswordConfirmed ?
              <Fragment>
                <Typography align="center">
                  수정 또는 탈퇴를 하려면 비밀번호를 입력하십시요.
                </Typography>
                <FormControl
                  fullWidth
                  margin="dense"
                >
                  <InputLabel htmlFor="password">비밀번호</InputLabel>
                  <Input
                    id="password"
                    value={password}
                    onChange={this.handleChange('password')}
                    type="password"
                    className={classes.password}
                  />
                </FormControl>
                <Button
                  className={classes.signIn}
                  color="primary"
                  variant="raised"
                  size="large"
                  fullWidth
                  onClick={this.handlePasswordConfirm}
                >
                  입력
                </Button>
              </Fragment> :
              <Fragment>
                <Button
                  className={classes.signIn}
                  color="primary"
                  variant="raised"
                  size="large"
                  fullWidth
                  onClick={this.handleModify}
                  disabled={password !== passwordCheck || (password !== '' && password.length < 8)}
                >
                  수정하기
                </Button>
                <Button
                  color="primary"
                  onClick={handleExit}
                >
                  탈퇴하기
                </Button>
              </Fragment>
          }
        </div>
      </Fragment>
    );
  }
}
export default withStyles(styles)(Form);
