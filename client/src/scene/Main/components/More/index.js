import React from 'react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import MoreIcon from '@material-ui/icons/KeyboardArrowDown';

const styles = {
  root: {
    width: '100%',
    textAlign: 'center',
  },
};
class Title extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <IconButton>
          <MoreIcon style={{ fontSize: 36 }}/>
        </IconButton>
      </div>
    )
  }
}
export default withStyles(styles)(Title);
