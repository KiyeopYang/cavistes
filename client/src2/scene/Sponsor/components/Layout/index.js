import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';

const styles = theme => ({
  root: {
    width: 600,
    margin: 'auto',
    minHeight: 500,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      minHeight: 'auto',
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
