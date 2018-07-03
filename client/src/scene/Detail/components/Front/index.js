import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Slider from 'react-slick';

const styles = {
  root: {
    textAlign: 'center',
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: 'auto',
  },
  slider: {
    marginBottom: 35,
  },
};
class Front extends React.Component {
  render() {
    const { classes, images } = this.props;
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
        <Slider
          className={classes.slider}
          {...settings}
        >
          {
            images.map(o => (
              <img key={o.path} className={classes.img} src={o.path} />
            ))
          }
        </Slider>
      </div>
    );
  }
}
export default withStyles(styles)(Front);
