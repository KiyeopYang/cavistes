import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = {
  root: {
    marginBottom: 20,
  },
  text: {
    whiteSpace: 'pre-line',
  },
};
class Block extends React.Component {
  render() {
    const {
      classes,
      title,
      text,
      children,
    } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="headline" gutterBottom>
          <strong>{title}</strong>
        </Typography>
        {
          text ?
            <Typography
              className={classes.text}
              variant="subheading"
              gutterBottom
            >
              {text}
            </Typography> : null
        }
        {children}
      </div>
    );
  }
}
export default withStyles(styles)(Block);
