import React from 'react';
import { withStyles } from 'material-ui/styles';
import Slider from 'react-slick';
import Button from 'material-ui/Button';
import SettingIcon from '@material-ui/icons/Settings';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import ImageUploaderModal from '../../../../components/ImageUploaderModal';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingBottom: 40,
    overflow: 'hidden',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    margin: 'auto',
  },
  img: {
    width: '100%',
    height: 'auto',
  },
  settingWrapper: {
    width: '100%',
    textAlign: 'right',
    padding: 4,
    marginTop: theme.spacing.unit * 2,
  },
  wrapper: {
    padding: theme.spacing.unit * 2,
  }
});
class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isImageUploaderModalOpen: false,
    };
  }
  render() {
    const {
      isImageUploaderModalOpen,
    } = this.state;
    const {
      classes,
      managerMode,
      titleImages,
      handleUpdate,
    } = this.props;
    const settings = {
      dots: window.innerWidth < 1000,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      centerPadding: window.innerWidth > 1000 ? '250px' : '0px',
      centerMode: true,
      adaptiveHeight: true,
      swipeToSlide: true,
    };
    return (
      <div className={classes.root}>
        {
          titleImages.length ?
            <Slider {...settings}>
              {
                titleImages.filter(o => o && o.path).map((img) => (
                  <div key={img.path} className={classes.wrapper}>
                    <Card raised key={img.path}>
                    <img key={img.path} className={classes.img} src={img.path} />
                    </Card>
                  </div>
                ))
              }
            </Slider> : null
        }
        {
          managerMode ?// 차후 다시
            <div className={classes.settingWrapper}>
              <Button
                color="primary"
                onClick={() => this.setState({
                  isImageUploaderModalOpen: true,
                })}
              >
                <SettingIcon/>
                이미지 수정
              </Button>
            </div> : null
        }
        <ImageUploaderModal
          open={isImageUploaderModalOpen}
          onClose={() => this.setState({
            isImageUploaderModalOpen: false,
          })}
          onSubmit={handleUpdate}
        />
      </div>
    )
  }
}
export default withStyles(styles)(Title);
