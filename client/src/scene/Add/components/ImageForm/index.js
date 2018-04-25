import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Slider from 'react-slick';
import LocationMapFinder from '../../../../components/LocationMapFinder';
import ImageUploaderModal from '../../../../components/ImageUploaderModal';

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
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  formControl: {
    width: '100%',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});
class From extends React.Component {
  constructor(props) {
    super(props);
    const { sponsor } = this.props;
    this.state = {
      title: '',
      subTitle: '',
      price: 0,
      shopName: '',
      shopLocation: '',
      shopLocationDetail: '',
      shopPhone: '',
      maxPeople: 10,
      datetimes: [],
      datetimeInput: '',
      images: [],
      desc: '',
      sponsorName: (sponsor && sponsor.name) || '',
      sponsorPhone: (sponsor && sponsor.phone) || '',
      sponsorEmail: (sponsor && sponsor.email) || '',
      level: '1',
      replyOn: '1',
      isLocationMapFinderOpen: false,
      isImageUploaderModalOpen: false,
    };
  }
  handleInputChange = (prop) => {
    return (e) => {
      this.setState({
        [prop]: e.target.value,
      })
    }
  };
  handleSubmit = () => {
    const {
      title,
      subTitle,
      price,
      shopName,
      shopLocation,
      shopLocationDetail,
      shopPhone,
      maxPeople,
      datetimes,
      desc,
      sponsorName,
      sponsorPhone,
      sponsorEmail,
      level,
      replyOn,
    } = this.state;
    this.props.handleSubmit({
      title,
      subTitle,
      price,
      shop: {
        name: shopName,
        location: shopLocation,
        locationDetail: shopLocationDetail,
        phone: shopPhone,
      },
      maxPeople,
      datetimes,
      desc,
      sponsor: {
        name: sponsorName,
        phone: sponsorPhone,
        email: sponsorEmail,
      },
      level,
      replyOn: replyOn === '1',
    });
  };
  render() {
    const {
      classes,
      event,
      openImageUploader,
      onSubmit,
    } = this.props;
    const {
    } = this.state;
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
            event.images.map((img) => (
              <img key={img.path} className={classes.img} src={img.path} />
            ))
          }
        </Slider>
        <Button
          style={{ marginTop: '20px', marginBottom: '15px' }}
          color="primary"
          fullWidth
          onClick={openImageUploader}
        >
          이미지 수정
        </Button>
        <Button
          color="primary"
          fullWidth
          variant="raised"
          onClick={onSubmit}
        >
          이벤트 생성
        </Button>
      </React.Fragment>
    )
  }
}
export default withStyles(styles)(From);
