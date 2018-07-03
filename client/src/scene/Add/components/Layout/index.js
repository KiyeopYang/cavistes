import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';

const styles = {
  wrapper: {
    width: '100%',
  },
  body: {
    background: 'white',
    margin: 'auto',
    width: 'cal(100% - 6vw)',
    maxWidth: '600px',
    padding: '30px',
    marginBottom: '30px',
  },
};
class Layout extends React.Component {
  render() {
    const { classes, children } = this.props;
    return (
      <div className={classes.wrapper}>
        <Paper className={classes.body}>
          { children }
        </Paper>
      </div>
    )
  }
}
export default withStyles(styles)(Layout);
