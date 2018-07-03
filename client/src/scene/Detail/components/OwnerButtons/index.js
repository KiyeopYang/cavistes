import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import IconSetting from '@material-ui/icons/Settings';
import IconDelete from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    width: '100%',
    textAlign: 'right',
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
});
class OwnerButtons extends React.Component {
  render() {
    const {
      classes,
      onClick,
    } = this.props;
    return (
      <div className={classes.root}>
        <Button color="primary" onClick={() => onClick('update')}>
          <IconSetting className={classes.icon}/>
          수정
        </Button>
        <Button color="primary" onClick={() => onClick('remove')}>
          <IconDelete className={classes.icon}/>
          삭제
        </Button>
      </div>
    );
  }
}
export default withStyles(styles)(OwnerButtons);
