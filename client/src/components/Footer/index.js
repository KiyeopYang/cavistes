import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MapIcon from '@material-ui/icons/Map';

const styles = theme => ({
  root: {
    paddingBottom: 50,
    background: theme.palette.secondary.main,
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 50,
    },
  },
  footer: {
    maxWidth: 1000,
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: 16,
    },
  },
  flex: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  title: {
    padding: 25,
    color: 'white',
    fontSize: 32,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  info: {
    color: 'white',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  toolbar: {
    maxWidth: 1000,
    width: '100%',
    margin: 'auto',
    padding: 0,
  },
  icon: {
    color: 'white',
  },
});
class Footer extends React.Component {
  render() {
    const { classes, children } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.footer}>
          <div className={classes.flex}>
            <Typography
              className={classNames(classes.title)}
            >
              CAVISTES
            </Typography>
            <div>
              <Typography
                className={classes.info}
              >
                서울시 강남구 대치동 949번지 수암빌딩 1층 (02-565-2223)
              </Typography>
              <Typography className={classes.info}>
                9, Yeongdong-daero 75-gil, Gangnam-gu, Seoul, Republic of Korea
              </Typography>
            </div>
          </div>
          <a href="https://goo.gl/maps/WdxoBjjimWk" target="_blank">
            <IconButton
              size="large"
              className={classes.icon}
            >
              <MapIcon/>
            </IconButton>
          </a>
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(Footer);
