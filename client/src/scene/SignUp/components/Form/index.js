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
  typeButtonWrapper: {
    width: '100%',
    marginTop: 8,
  },
  typeButton: {
    width: '50%',
    border: '1px solid lightGray',
    color: 'lightGray',
    borderRadius: 0,
  },
  typeButtonSelected: {
    border: '1px solid #052b76',
    color: '#052b76',
  },
  password: {
    fontFamily: 'sans-serif',
  },
});
const BANKS = [
  '국민은행', '신한은행', '기업은행', '우리은행', '농협', '스탠다드차타드', '하나은행',
];
class Form extends React.Component {
  constructor(props) {
    super(props);
    const now = new Date();
    this.state = {
      type: 'default',
      email: '',
      password: '',
      passwordCheck: '',
      name: '',
      phone: '',
      gender: 'm',
      birthYear: '',
      birthYearInputs:
        Array.apply(null, { length: 100 }).map(Number.call, i => now.getUTCFullYear() - Number(i)),
      birthMonth: '',
      birthMonthInputs: [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
      ],
      birthDate: '',
      work: '',
      house: '',
      isLocationMapFinderOpen: false,
    };
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  disabled = () => {
    const {
      password,
      passwordCheck,
      email,
      name,
      phone,
    } = this.state;
    return (
      password.length < 8 ||
      password !== passwordCheck ||
      email.length < 1 ||
      name.length < 1 ||
      phone.length < 1
    );
  };
  handleSubmit = () => {
    const {
      type,
      email,
      password,
      name,
      phone,
      gender,
      birthYear,
      birthMonth,
      birthDate,
      work,
      house,
    } = this.state;
    this.props.handleSubmit({
      email,
      password,
      name,
      phone,
      gender,
      birth: birthYear !== '' ? new Date(birthYear, birthMonth, birthDate) : new Date(),
      type,
      work,
      house,
    });
  };
  render() {
    const { classes }  = this.props;
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
        <Typography
          align="center"
          gutterBottom
        >
          아래 사항을 기입 해 주십시요.
        </Typography>
        <div className={classes.wrapperOfTwoForm}>
          <div className={classNames(classes.leftOfTwoForm, classes.oneOfTwoForm)}>
            <FormControl
              required
              margin="dense"
              fullWidth
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
            >
              <InputLabel htmlFor="phone">전화번호</InputLabel>
              <Input id="phone" value={phone} onChange={this.handleChange('phone')} />
            </FormControl>
          </div>
        </div>
        <div>
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
                />
              </FormControl>
            </div>
          </div>
          <FormControl
            required
            fullWidth
            margin="dense"
          >
            <InputLabel htmlFor="email">이메일</InputLabel>
            <Input
              id="email"
              value={email}
              onChange={this.handleChange('email')}
              type="email"
            />
          </FormControl>
          <FormControl
            component="fieldset"
            required
            margin="dense"
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
            />
          </FormControl>
          <FormControl
            margin="dense"
            fullWidth
          >
            <FormLabel component="legend">생년월일</FormLabel>
            <div>
              <FormControl
                className={classes.birthForm}
                margin="dense"
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
          <Button
            className={classes.signIn}
            color="primary"
            variant="raised"
            size="large"
            fullWidth
            disabled={this.disabled()}
            onClick={this.handleSubmit}
          >
            가입
          </Button>
        </div>
      </Fragment>
    );
  }
}
export default withStyles(styles)(Form);
