import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    width: '100%',
    textAlign: 'center',
    marginTop: 32,
  },
  button: {
    border: '1px solid grey',
    fontFamily: 'CircularBook',
    borderRadius: 0,
    height: 35,
    width: 220,
  },
};
class Title extends React.Component {
  render() {
    const { classes, handleClick } = this.props;
    return (
      <div className={classes.root}>
        <Button
          className={classes.button}
          color="primary"
          onClick={handleClick}
        >
          MORE
        </Button>
      </div>
    )
  }
}
export default withStyles(styles)(Title);
