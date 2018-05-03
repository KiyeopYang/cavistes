import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = {
  root: {
    height: 50,
    zIndex: 1000,
    position: 'fixed',
    bottom: 0,
  },
};
class Submit extends React.Component {
  render() {
    const {
      classes,
      onSubmit,
      attendanceManagerMode,
      alreadySubmitted,
    } = this.props;
    return (
      <Button
        className={classes.root}
        align="center"
        color="primary"
        variant="raised"
        size="large"
        fullWidth
        onClick={onSubmit}
      >
        {
          attendanceManagerMode ? '신청 인원 보기' : alreadySubmitted ?
            '신청 정보 보기' : '신청하기'
        }
      </Button>
    );
  }
}
export default withStyles(styles)(Submit);
