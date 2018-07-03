import React, { Fragment } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = {
  login: {
    marginTop: 16,
  },
};
class BankAccount extends React.Component {
  constructor(props) {
    super(props);
    const { number, bankCode, name, banks } = this.props;
    this.state = {
      bankCode: bankCode || banks[0],
      number: number || '',
      name: name || '',
    };
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
  render() {
    const {
      classes,
      handleSubmit,
      banks,
    }  = this.props;
    const {
      bankCode,
      number,
      name,
    } = this.state;
    return (
      <Fragment>
        <Typography
          variant="headline"
        >
          입금 은행 계좌 관리
        </Typography>
        <Typography>
          계좌 수정 시, 자동 입금 서비스 http://www.apibox.kr/bank 를 꼭 같이 수정해주세요.
        </Typography>
        <FormControl>
          <InputLabel htmlFor="bank">은행</InputLabel>
          <Select
            native
            value={bankCode}
            onChange={this.handleChange('bankCode')}
            inputProps={{
              id: 'bank',
            }}
          >
            {banks.map(o => <option key={o.code} value={o.code}>{o.name}</option>)}
          </Select>
        </FormControl>
        <TextField
          label="계좌번호"
          fullWidth
          margin="dense"
          onChange={this.handleChange('number')}
          value={number}
        />
        <TextField
          label="예금주"
          fullWidth
          margin="dense"
          type="name"
          onChange={this.handleChange('name')}
          value={name}
        />
        <Button
          color="primary"
          fullWidth
          onClick={() => handleSubmit(this.state)}
        >
          수정하기
        </Button>
      </Fragment>
    );
  }
}
export default withStyles(styles)(BankAccount);
