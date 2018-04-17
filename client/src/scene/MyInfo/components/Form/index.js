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
const BANKS = [
  '국민은행', '신한은행', '기업은행', '우리은행', '농협', '스탠다드차타드', '하나은행',
];
class Form extends React.Component {
  constructor(props) {
    super(props);
    const now = new Date();
    const { user } = this.props;
    const userBirth = new Date(user.birth);
    const shop = user.shop;
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
      shopName: shop ? shop.name : '',
      shopLocation: shop ? shop.location : '',
      shopLocationDetail: shop ? shop.locationDetail : '',
      shopPhone: shop ? shop.phone : '',
      shopAccountBank: shop ? shop.accountBank : '',
      shopAccountNumber: shop ? shop.accountNumber : '',
      shopAccountName: shop ? shop.accountName : '',
      isLocationMapFinderOpen: false,
      isPasswordConfirmed: false,
    };
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handlePasswordConfirm = () => {
    if (this.state.password === this.props.user.password) {
      this.setState({
        isPasswordConfirmed: true,
      });
    } else {
      this.props.handleError('비밀번호가 맞지 않습니다.');
    }
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
      shopName,
      shopLocation,
      shopLocationDetail,
      shopPhone,
      shopAccountBank,
      shopAccountNumber,
      shopAccountName,
    } = this.state;
    this.props.handleModify({
      name,
      phone,
      gender,
      birth: new Date(birthYear, birthMonth, birthDate),
      type,
      shop: type === 'shop' ? {
        name: shopName,
        location: shopLocation,
        locationDetail: shopLocationDetail,
        phone: shopPhone,
        accountBank: shopAccountBank,
        accountNumber: shopAccountNumber,
        accountName: shopAccountName,
      } : null,
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
      name,
      phone,
      gender,
      birthYear,
      birthYearInputs,
      birthMonth,
      birthMonthInputs,
      birthDate,
      shopName,
      shopPhone,
      shopLocation,
      shopLocationDetail,
      shopAccountBank,
      shopAccountNumber,
      shopAccountName,
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
        <Typography
          className={classes.title}
          align="center"
          gutterBottom
        >
          CAVISTES
        </Typography>
        <div>
          <FormControl
            component="fieldset"
            required
            disabled
          >
            <FormLabel component="legend">가입 유형</FormLabel>
            <RadioGroup
              aria-label="type"
              name="type1"
              value={type}
              onChange={this.handleChange('type')}
              className={classes.typeForm}
              disabled={!isPasswordConfirmed}
            >
              <FormControlLabel
                value="default"
                control={
                  <Radio
                    color="primary"
                  />
                }
                label="일반 고객"
              />
              <FormControlLabel
                value="shop"
                control={
                  <Radio
                    color="primary"
                  />
                }
                label="매장 점주"
              />
            </RadioGroup>
          </FormControl>
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
          {
            type === 'shop' ?
              <Fragment>
                <FormControl
                  required
                  fullWidth
                  margin="dense"
                  disabled={!isPasswordConfirmed}
                >
                  <InputLabel htmlFor="shopName">매장 이름</InputLabel>
                  <Input id="shopName" value={shopName} onChange={this.handleChange('shopName')} />
                </FormControl>
                <FormControl
                  required
                  fullWidth
                  margin="dense"
                  disabled={!isPasswordConfirmed}
                >
                  <InputLabel htmlFor="shopPhone">매장 전화번호</InputLabel>
                  <Input id="shopPhone" value={shopPhone} onChange={this.handleChange('shopPhone')} />
                </FormControl>
                <Button
                  className={classes.signIn}
                  color="primary"
                  variant="raised"
                  onClick={() => this.setState({
                    isLocationMapFinderOpen: true,
                  })}
                  disabled={!isPasswordConfirmed}
                >
                  주소 입력하기
                </Button>
                <FormControl
                  required
                  fullWidth
                  margin="dense"
                  disabled
                >
                  <InputLabel htmlFor="shopLocation">매장 주소</InputLabel>
                  <Input id="shopLocation" value={shopLocation}/>
                </FormControl>
                <FormControl
                  required
                  fullWidth
                  margin="dense"
                  disabled={!isPasswordConfirmed}
                >
                  <InputLabel htmlFor="shopLocationDetail">매장 세부주소</InputLabel>
                  <Input
                    id="shopLocationDetail"
                    value={shopLocationDetail}
                    onChange={this.handleChange('shopLocationDetail')}
                  />
                </FormControl>
                <FormControl
                  required
                  fullWidth
                  margin="dense"
                  disabled={!isPasswordConfirmed}
                >
                  <InputLabel htmlFor="shopAccountBank">은행명</InputLabel>
                  <Select
                    onChange={this.handleChange('shopAccountBank')}
                    native
                    value={shopAccountBank}
                    input={<Input id="shopAccountBank" />}
                  >
                    <option value="" />
                    {
                      BANKS.map(v => (
                        <option key={v} value={v}>{v}</option>
                      ))
                    }
                  </Select>
                </FormControl>
                <FormControl
                  required
                  fullWidth
                  margin="dense"
                  disabled={!isPasswordConfirmed}
                >
                  <InputLabel htmlFor="shopAccountNumber">입금 계좌번호</InputLabel>
                  <Input
                    id="shopAccountNumber"
                    value={shopAccountNumber}
                    onChange={this.handleChange('shopAccountNumber')}
                  />
                </FormControl>
                <FormControl
                  required
                  fullWidth
                  margin="dense"
                  disabled={!isPasswordConfirmed}
                >
                  <InputLabel htmlFor="shopAccountName">예금주</InputLabel>
                  <Input
                    id="shopAccountName"
                    value={shopAccountName}
                    onChange={this.handleChange('shopAccountName')}
                  />
                </FormControl>
                <LocationMapFinder
                  open={isLocationMapFinderOpen}
                  onClose={() => this.setState({
                    isLocationMapFinderOpen: false,
                  })}
                  onSubmit={({ location, locationDetail }) => this.setState({
                    shopLocation: location,
                    shopLocationDetail: locationDetail,
                  })}
                />
                <LocationMapFinder
                  open={isLocationMapFinderOpen}
                  onClose={() => this.setState({
                    isLocationMapFinderOpen: false,
                  })}
                  onSubmit={({ location, locationDetail }) => this.setState({
                    shopLocation: location,
                    shopLocationDetail: locationDetail,
                  })}
                />
              </Fragment> : null
          }
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
