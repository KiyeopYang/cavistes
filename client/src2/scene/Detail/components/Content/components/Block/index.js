import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = {
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  root: {
    marginBottom: 20,
  },
  text: {
    whiteSpace: 'pre-line',
  },
  icon: {
    marginRight: 8,
  },
};
class Block extends React.Component {
  render() {
    const {
      classes,
      title,
      Icon,
      text,
      children,
    } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="headline" className={classes.title} gutterBottom>
          {
            Icon ? <Icon className={classes.icon}/> : null
          }
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
