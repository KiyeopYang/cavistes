import React from 'react';
import { withStyles } from 'material-ui/styles';
import Slider from 'react-slick';
import Button from 'material-ui/Button';
import SettingIcon from '@material-ui/icons/Settings';
import ImageUploaderModal from '../../../../components/ImageUploaderModal';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingBottom: 40,
    overflow: 'hidden',
    width: 550,
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
    textAlign: 'left',
    padding: 4,
  },
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
          managerMode ?// 차후 다시
            <div className={classes.settingWrapper}>
              <Button
                mini
                variant="fab"
                color="primary"
                onClick={() => this.setState({
                  isImageUploaderModalOpen: true,
                })}
              >
                <SettingIcon/>
              </Button>
            </div> : null
        }
        {
          titleImages.length ?
            <Slider {...settings}>
              {
                titleImages.filter(o => o && o.path).map((img) => (
                  <img key={img.path} className={classes.img} src={img.path} />
                ))
              }
            </Slider> : null
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
