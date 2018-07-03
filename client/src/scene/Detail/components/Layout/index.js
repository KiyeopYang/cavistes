import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  root: {
    marginTop: 50,
    maxWidth: 1000,
    margin: 'auto',
    borderRadius: 0,
    [theme.breakpoints.down('sm')]: {
      marginTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
});
class Layout extends React.Component {
  render() {
    const { classes, children } = this.props;
    return (
      <div className={classes.root}>
        {children}
      </div>
    )
  }
}
export default withStyles(styles)(Layout);
