import React from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import TermModal from './components/TermModal';

const styles = theme => ({
  root: {
    paddingTop: 40,
    paddingBottom: 40,
    background: 'rgb(44,44,44)',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 40,
    },
  },
  footer: {
    maxWidth: 1000,
    textAlign: 'center',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: 16,
    },
  },
  footerBtn: {
    color: 'white',
    cursor: 'pointer',
    display: 'inline-block',
    textDecoration: 'none',
  },
  divider: {
    height: 14,
    width: 1,
    background: 'grey',
    marginLeft: 6,
    marginRight: 6,
    display: 'inline-block',
  },
  rowMargin: {
    marginBottom: 20,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'grey',
  },
});
class Footer extends React.Component {
  state = {
    isTermModalOpen: false,
  };
  render() {
    const { isTermModalOpen } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.footer}>
          <div className={classNames(classes.row, classes.rowMargin)}>
            <Typography
              className={classes.footerBtn}
              onClick={() => this.setState({
                isTermModalOpen: true,
              })}
            >
              개인정보취급방침 및 이용약관
            </Typography>
            <div className={classes.divider}/>
            <Typography
              className={classes.footerBtn}
              component="a"
              href="mailto:cavistes@cavistes.co.kr"
            >
              메일 문의
            </Typography>
          </div>
          <Hidden smDown>
            <div className={classes.row}>
              <Typography className={classes.text}>
                9, Yeongdong-daero 75-gil, Gangnam-gu,  Seoul, Republic of Korea
              </Typography>
              <div className={classes.divider}/>
              <Typography className={classes.text}>
                Tel) 02.565.2223
              </Typography>
            </div>
            <div className={classNames(classes.row, classes.rowMargin)}>
              <Typography className={classes.text}>
                Business License 120 12 14999
              </Typography>
              <div className={classes.divider}/>
              <Typography className={classes.text}>
                Name of Representative: Lee, Minwoo
              </Typography>
            </div>
          </Hidden>
          <Hidden mdUp>
            <div className={classes.row}>
              <Typography className={classes.text}>
                9, Yeongdong-daero 75-gil, Gangnam-gu,  Seoul, Republic of Korea
              </Typography>
            </div>
            <div className={classes.row}>
              <Typography className={classes.text}>
                Tel) 02.565.2223
              </Typography>
              <div className={classes.divider}/>
              <Typography className={classes.text}>
                Business License 120 12 14999
              </Typography>
            </div>
            <div className={classNames(classes.row, classes.rowMargin)}>
              <Typography className={classes.text}>
                Name of Representative: Lee, Minwoo
              </Typography>
            </div>
          </Hidden>
          <div>
            <Typography className={classes.text}>
              Copyright ⓒ 2018 CAVISTES. All rights reserved.
            </Typography>
          </div>
        </div>
        <TermModal
          open={isTermModalOpen}
          onClose={() => this.setState({
            isTermModalOpen: false,
          })}
        />
      </div>
    )
  }
}
export default withStyles(styles)(Footer);
