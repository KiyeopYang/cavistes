import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
  root: {
    width: 1000,
    margin: 'auto',
    minHeight: 500,
    marginTop: 40,
    marginBottom: 40,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 40px)',
      minHeight: 'auto',
      margin: 20,
    },
  },
});
class Layout extends React.Component {
  render() {
    const { classes, children } = this.props;
    return (
      <Card className={classes.root}>
        <CardContent>
        {children}
        </CardContent>
      </Card>
    );
  }
}
export default withStyles(styles)(Layout);
