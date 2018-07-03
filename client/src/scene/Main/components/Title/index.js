import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Text from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    textAlign: 'center',
    overflow: 'hidden',
    width: '100%',
    margin: 'auto',
    marginTop: 36,
    marginBottom: 36,
    [theme.breakpoints.down('sm')]: {
      marginTop: 18,
      marginBottom: 18,
    },
  },
  title1: {
    fontFamily: 'CircularMedium',
    color: theme.palette.primary.main,
    fontSize: 24,
    letterSpacing: '5px',
    marginBottom: 10,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 5,
    },
  },
  title2: {
    fontSize: 14,
  },
});
class Title extends React.Component {
  render() {
    const {
      classes,
    } = this.props;

    return (
      <div className={classes.root}>
        <Text
          className={classes.title1}
        >
          BOOKING LIST
        </Text>
        <Text
          className={classes.title2}
        >
          <strong>카비스트 아카데미가 엄선한 알찬 강좌 및 이벤트</strong>
        </Text>
      </div>
    )
  }
}
export default withStyles(styles)(Title);
