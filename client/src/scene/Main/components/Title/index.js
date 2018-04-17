import React from 'react';
import { withStyles } from 'material-ui/styles';
import Slider from 'react-slick';
import Button from 'material-ui/Button';
import SettingIcon from '@material-ui/icons/Settings';

const styles = {
  root: {
    textAlign: 'center',
    paddingBottom: 40,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: 'auto',
  },
  settingWrapper: {
    width: '100%',
    textAlign: 'left',
    padding: 4,
  },
};
class Title extends React.Component {
  render() {
    const {
      classes,
      managerMode,
    } = this.props;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
    };
    return (
      <div className={classes.root}>
        {
          managerMode && null ? // 차후 다시
            <div className={classes.settingWrapper}>
              <Button
                mini
                variant="fab"
                color="primary"
              >
                <SettingIcon/>
              </Button>
            </div> : null
        }
        <Slider {...settings}>
          <img className={classes.img} src="title1.jpg" />
          <img className={classes.img} src="title2.jpg" />
          <img className={classes.img} src="title3.jpg" />
          <img className={classes.img} src="title4.jpg" />
        </Slider>
      </div>
    )
  }
}
export default withStyles(styles)(Title);
