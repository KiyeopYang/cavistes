import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import IconEvent from '@material-ui/icons/Event';
import IconPrice from '@material-ui/icons/AttachMoney';
import IconMap from '@material-ui/icons/Map';
import IconGroup from '@material-ui/icons/Group';

const styles = theme => ({
  root: {
    width: '100%',
  },
  titleWrapper: {
    background: theme.palette.primary.main,
  },
  title: {
    color: 'white',
    fontSize: 24,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
      [theme.breakpoints.down('sm')]: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
      },
    },
  },
  paragraph: {
    fontSize: 18,
    whiteSpace: 'pre-line',
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
  subHeading: {
    display: 'flex',
    color: '#CF0F0F',
    fontSize: 18,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
  greyText: {
    color: '#9C9C9C',
  },
});
class Title extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.titleWrapper}>
          <Typography className={classes.title} gutterBottom>
            <strong>남프랑스의 그랑크뤼, 도마스가삭 시음회</strong>
          </Typography>
        </div>
        <div>
          <Typography className={classes.subHeading} gutterBottom>
            <IconEvent className={classes.icon}/><strong>2018/4/1부터 (4회)</strong>
          </Typography>
          <Typography className={classes.subHeading} gutterBottom>
            <IconPrice className={classes.icon}/><strong>참가비 200,000원</strong>
          </Typography>
          <Typography className={classes.subHeading} gutterBottom>
            <IconMap className={classes.icon}/><strong>카비스트 삼성점</strong>
          </Typography>
          <Typography className={classes.subHeading} gutterBottom>
            <IconGroup className={classes.icon}/>
            <strong>2/10명</strong>
          </Typography>
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(Title);
