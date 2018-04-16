import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    textAlign: 'center',
  },
  img: {
    width: '100%',
    height: 'auto',
  },
};
class Title extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <img className={classes.img} src="title.jpg" />
      </div>
    )
  }
}
export default withStyles(styles)(Title);
