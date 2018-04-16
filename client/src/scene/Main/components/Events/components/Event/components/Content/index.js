import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    width: 700,
    padding: 20,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: 0,
    },
  },
  title: {
    fontSize: 24,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  paragraph: {
    whiteSpace: 'pre-line',
    fontSize: 18,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  subHeading: {
    fontSize: 18,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  redText: {
    color: '#CF0F0F',
  },
  greyText: {
    color: '#9C9C9C',
  },
  upperBlock: {
    height: 100,
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
  },
});
class Content extends React.Component {
  render() {
    const {
      classes,
      handleClick,
    } = this.props;
    return (
      <div className={classes.root}>
        <div
          className={classes.upperBlock}
          onClick={handleClick}
        >
          <Typography className={classes.title} gutterBottom>
            <strong>남프랑스의 그랑크뤼, 도마스가삭 시음회</strong>
          </Typography>
          <Typography className={classNames(classes.redText, classes.subHeading)} variant="subheading" gutterBottom>
            <strong>참가비 200,000원</strong>
          </Typography>
          <Typography className={classNames(classes.redText, classes.subHeading)} variant="subheading" gutterBottom>
            <strong>카비스트 삼성점</strong>
          </Typography>
        </div>
        <div style={{ height: 130, overflowY: 'scroll' }}>
          <Typography
            className={classNames(classes.paragraph, classes.greyText)}
            noWrap
            gutterBottom
          >
            {`1.Daumas Gassac Rose Frizant 2016 미수입
              2.Daumas Gassac Blanc 2016
              3.Moulin de Gassac Pinot Noir 2016
              1.Daumas Gassac Rose Frizant 2016 미수입
              2.Daumas Gassac Blanc 2016
              3.Moulin de Gassac Pinot Noir 2016
              1.Daumas Gassac Rose Frizant 2016 미수입
              2.Daumas Gassac Blanc 2016
              3.Moulin de Gassac Pinot Noir 2016`}
          </Typography>
        </div>
        <div style={{ height: 50 }}>
          <Typography
            variant="headline"
            align="right"
            className={classes.redText}
            gutterBottom
          >
            2/10명 신청
          </Typography>
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(Content);
