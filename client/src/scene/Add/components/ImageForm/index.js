import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import Slider from 'react-slick';
import SettingIcon from '@material-ui/icons/Settings';
import CreateIcon from '@material-ui/icons/Create';

const styles = theme => ({
  forms: {
    width: '100%',
  },
  buttonWrapper: {
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonFailure: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
  formControl: {
    width: '100%',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  iconWrapper: {
    width: '100%',
    textAlign: 'right',
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
});
class From extends React.Component {
  render() {
    const {
      classes,
      event,
      openImageUploader,
      onSubmit,
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
      <React.Fragment>
        <Typography
          variant="headline"
        >
          이미지
        </Typography>
        <Slider {...settings}>
          {
            event.images.map(img => (
              <img key={img.path} className={classes.img} src={img.path} />
            ))
          }
        </Slider>
        <div className={classes.iconWrapper}>
          <Button
            style={{ marginTop: '20px', marginBottom: '15px' }}
            color="primary"
            onClick={openImageUploader}
          >
            <SettingIcon className={classes.icon}/>
            이미지 수정
          </Button>
        </div>
        <div className={classes.iconWrapper}>
          <Button
            color="primary"
            onClick={onSubmit}
          >
            <CreateIcon className={classes.icon}/>
            이벤트 생성
          </Button>
        </div>
      </React.Fragment>
    )
  }
}
export default withStyles(styles)(From);
