import React, { Fragment } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const styles = {
  title: {
    fontSize: 20,
  },
};
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      phone: this.props.user.phone,
    };
  }
  handleChange = name => e => this.setState({
    [name]: e.target.value,
  });
  handleSubmit = () => {
    this.props.handleSubmit(this.state);
  };
  render() {
    const {
      classes,
      handleNext,
    }  = this.props;
    const {
      name,
      phone,
    } = this.state;
    return (
      <Fragment>
        <Typography
          className={classes.title}
          align="center"
        >
          다음 사항이 맞는 지 확인 해 주십시요.
        </Typography>
        <form>
          <TextField
            label="이름"
            fullWidth
            margin="dense"
            onChange={this.handleChange('name')}
            value={name}
          />
          <TextField
            label="전화번호"
            fullWidth
            margin="dense"
            onChange={this.handleChange('phone')}
            value={phone}
          />
          <Button
            type="submit"
            className={classes.login}
            fullWidth
            color="primary"
            variant="raised"
            size="large"
            onClick={(e) => {
              e.preventDefault();
              handleNext();
            }}
          >
            참석
          </Button>
        </form>
      </Fragment>
    );
  }
}
export default withStyles(styles)(Form);
