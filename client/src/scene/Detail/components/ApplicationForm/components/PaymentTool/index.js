import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = {
  title: {
    fontSize: 20,
  },
  button: {
    marginTop: '15px',
  },
};
class PaymentTool extends React.Component {
  render() {
    const {
      classes,
      handleNext,
      handleCardClick
    }  = this.props;
    return (
      <Fragment>
        <Typography
          className={classes.title}
          align="center"
        >
          결제 수단을 선택하십시요.
        </Typography>
        <Button
          className={classes.button}
          fullWidth
          color="primary"
          variant="raised"
          onClick={(e) => {
            e.preventDefault();
            handleNext('bank');
          }}
        >
          무통장입금
        </Button>
      </Fragment>
    );
    // return (
    //   <Fragment>
    //     <Typography
    //       className={classes.title}
    //       align="center"
    //     >
    //       결제 수단을 선택하십시요.
    //     </Typography>
    //     <Button
    //       className={classes.button}
    //       fullWidth
    //       color="primary"
    //       variant="raised"
    //       onClick={(e) => {
    //         e.preventDefault();
    //         handleNext('card');
    //       }}
    //     >
    //       카드 결제
    //     </Button>
    //     <Button
    //       className={classes.button}
    //       fullWidth
    //       color="primary"
    //       variant="raised"
    //       onClick={(e) => {
    //         e.preventDefault();
    //         handleNext('bank');
    //       }}
    //     >
    //       무통장입금
    //     </Button>
    //   </Fragment>
    // );
  }
}
export default withStyles(styles)(PaymentTool);
