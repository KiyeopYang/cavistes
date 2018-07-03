import React, { Fragment } from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import LocationMapFinder from '../../../../components/LocationMapFinder';

const styles = theme => ({
  title: {
    fontSize: 32,
  },
  next: {
    marginTop: 16,
  },
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
});
class Form extends React.Component {
  constructor(props) {
    super(props);
    const now = new Date();
    const user = this.props.account;
    const userBirth = new Date(user.birth);
    this.state = {
      type: user.type,
      email: user.email,
      password: '',
      name: user.name,
      phone: user.phone,
      gender: user.gender,
      birthYear: userBirth.getUTCFullYear(),
      birthYearInputs:
        Array.apply(null, { length: 100 }).map(Number.call, i => now.getUTCFullYear() - Number(i)),
      birthMonth: userBirth.getMonth(),
      birthMonthInputs: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
      ],
      birthDate: userBirth.getDate(),
      memo: user.memo,
      work: user.work,
      house: user.house,
      level: user.level,
      confirmed: user.confirmed,
    };
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
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
      memo,
      work,
      house,
      confirmed,
      level,
    } = this.state;
    this.props.handleSubmit({
      type: 'modify',
      data: {
        name,
        phone,
        gender,
        birth: new Date(birthYear, birthMonth, birthDate),
        type,
        memo,
        work,
        house,
        confirmed,
        level,
      },
      id: this.props.account.id,
    });
  };
  handleRemove = () => {
    this.props.handleSubmit({
      type: 'remove',
      id: this.props.account.id,
    });
  };
  render() {
    const {
      classes,
      handleExit,
      handleModify,
      managerMode,
      handleSubmit,
      attendanceMode,
    } = this.props;
    const {
      type,
      email,
      password,
      name,
      phone,
      gender,
      birthYear,
      birthYearInputs,
      birthMonth,
      birthMonthInputs,
      birthDate,
      memo,
      work,
      house,
      confirmed,
      level,
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
        <div>
          <FormControl
            component="fieldset"
            required
            disabled={!managerMode || attendanceMode}
          >
            <FormLabel component="legend">가입 유형</FormLabel>
            <RadioGroup
              aria-label="type"
              name="type1"
              value={type}
              onChange={this.handleChange('type')}
              className={classes.typeForm}
              disabled
            >
              <FormControlLabel
                value="default"
                control={
                  <Radio
                    color="primary"
                  />
                }
                label="일반 고객"
                disabled
              />
              <FormControlLabel
                value="sponsor"
                control={
                  <Radio
                    color="primary"
                  />
                }
                label="매장 점주"
                disabled
              />
              <FormControlLabel
                value="manager"
                control={
                  <Radio
                    color="primary"
                  />
                }
                label="관리자"
                disabled
              />
            </RadioGroup>
          </FormControl>
          <FormControl
            required
            fullWidth
            margin="dense"
            disabled={!managerMode || attendanceMode}
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
                disabled={!managerMode || attendanceMode}
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
                disabled={!managerMode || attendanceMode}
              >
                <InputLabel htmlFor="phone">전화번호</InputLabel>
                <Input id="phone" value={phone} onChange={this.handleChange('phone')} />
              </FormControl>
            </div>
          </div>
          <FormControl
            component="fieldset"
            required
            margin="dense"
            disabled={!managerMode || attendanceMode}
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
            disabled={!managerMode || attendanceMode}
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
            disabled={!managerMode || attendanceMode}
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
            disabled={!managerMode || attendanceMode}
          >
            <FormLabel component="legend">생년월일 (미입력시 가입일)</FormLabel>
            <div>
              <FormControl
                className={classes.birthForm}
                margin="dense"
                disabled={!managerMode || attendanceMode}
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
                disabled={!managerMode || attendanceMode}
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
                disabled={!managerMode || attendanceMode}
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
            disabled={!managerMode || attendanceMode}
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
          <TextField
            label="메모"
            multiline
            margin="dense"
            fullWidth
            value={memo}
            onChange={this.handleChange('memo')}
          />
          {
            type === 'sponsor' ?
              <FormControlLabel
                control={
                  <Switch
                    checked={confirmed}
                    onChange={e => this.setState({
                      confirmed: e.target.checked,
                    })}
                    color="primary"
                    value="confirmed"
                  />
                }
                label="모임 생성 승인"
              /> : null
          }
          <Button
            className={classes.signIn}
            color="primary"
            variant="raised"
            size="large"
            fullWidth
            onClick={this.handleModify}
          >
            수정하기
          </Button>
          {
            managerMode ?
              <Button
                color="primary"
                onClick={this.handleRemove}
              >
                탈퇴하기
              </Button> : null
          }
        </div>
      </Fragment>
    );
  }
}
export default withStyles(styles)(Form);
