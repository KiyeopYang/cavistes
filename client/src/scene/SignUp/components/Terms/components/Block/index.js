import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';
import IconZoom from '@material-ui/icons/ZoomIn';

const styles = theme => ({
  titleWrapper: {
    background: theme.palette.primary.main,
    padding: 4,
  },
  title: {
    color: theme.palette.primary.contrastText,
    fontSize: 16,
    display: 'flex',
    cursor: 'pointer',
  },
  content: {
    whiteSpace: 'pre-line',
    maxHeight: 150,
    overflowY: 'scroll',
    border: '1px solid grey',
    padding: theme.spacing.unit,
  },
});
class Block extends React.Component {
  render() {
    const {
      classes,
      title,
      content,
      isChecked,
      onChange,
      onZoom,
    }  = this.props;
    return (
      <div>
        <div className={classes.titleWrapper}>
          <Typography
            className={classes.title}
            onClick={onZoom}
          >
            {title}
            <IconZoom/>
          </Typography>
        </div>
        <div className={classes.content}>
          <Typography>{content}</Typography>
        </div>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={isChecked}
                onChange={onChange}
              />
            }
            label="동의합니다"
          />
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Block);
