import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Text from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    marginTop: 48,
    marginBottom: 48,
    textAlign: 'center',
    overflow: 'hidden',
    width: '100%',
    margin: 'auto',
  },
  divider: {
    width: '100%',
    height: 1,
    background: 'grey',
  },
  title1: {
    fontFamily: 'CircularMedium',
    color: theme.palette.primary.main,
    fontSize: 24,
    letterSpacing: '5px',
    marginTop: 48,
    marginBottom: 10,
  },
  title2: {
    fontSize: 14,
    marginBottom: 36,
  },
  img: {
    width: 150,
    height: 'auto',
  },
});
class Sponsor extends React.Component {
  render() {
    const {
      classes,
    } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.divider} />
        <Text
          className={classes.title1}
        >
          SPONSOR
        </Text>
        <Text
          className={classes.title2}
        >
          <strong>카비스트 아카데미와 함께하는 협찬사</strong>
        </Text>
        <img
          className={classes.img}
          src="/sponsors2.PNG"
        />
      </div>
    )
  }
}
export default withStyles(styles)(Sponsor);
