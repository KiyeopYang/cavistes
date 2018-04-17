import React from 'react';
import { withStyles } from 'material-ui/styles';
import Slider from 'react-slick';

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
          <img className={classes.img} src="title1.jpg" />
          <img className={classes.img} src="title2.jpg" />
          <img className={classes.img} src="title3.jpg" />
          <img className={classes.img} src="title4.jpg" />
        </Slider>
      </div>
    );
  }
}
export default withStyles(styles)(Front);
