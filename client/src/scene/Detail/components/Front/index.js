import React from 'react';
import { withStyles } from 'material-ui/styles';
import Slider from 'react-slick';

const styles = {
  root: {
    textAlign: 'center',
    paddingBottom: 40,
    overflow: 'hidden',
  },
  imgWrapper: {
  },
  img: {
    width: '100%',
    height: 'auto',
  },
};
class Front extends React.Component {
  render() {
    const { classes } = this.props;
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
        <Slider {...settings}>
          <div className={classes.imgWrapper}>
            <img className={classes.img} src="one.jpg" />
          </div>
          <div className={classes.imgWrapper}>
            <img className={classes.img} src="two.jpg" />
          </div>
          <div className={classes.imgWrapper}>
            <img className={classes.img} src="title.jpg" />
          </div>
          <div className={classes.imgWrapper}>
            <img className={classes.img} src="one.jpg" />
          </div>
          <div className={classes.imgWrapper}>
            <img className={classes.img} src="one.jpg" />
          </div>
          <div className={classes.imgWrapper}>
            <img className={classes.img} src="one.jpg" />
          </div>
        </Slider>
      </div>
    );
  }
}
export default withStyles(styles)(Front);
