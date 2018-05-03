import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import IconBuild from '@material-ui/icons/Build';
import IconDelete from '@material-ui/icons/Delete';

const styles = {
  root: {
    width: '100%',
    textAlign: 'center',
  },
};
class OwnerButtons extends React.Component {
  render() {
    const {
      classes,
      onClick,
    } = this.props;
    return (
      <div className={classes.root}>
        <IconButton onClick={() => onClick('update')}>
          <IconBuild/>
        </IconButton>
        <IconButton onClick={() => onClick('remove')}>
          <IconDelete/>
        </IconButton>
      </div>
    );
  }
}
export default withStyles(styles)(OwnerButtons);
