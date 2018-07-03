import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import SettingIcon from '@material-ui/icons/Settings';
import MapIcon from '@material-ui/icons/Map';
import DeleteIcon from '@material-ui/icons/Delete';
import Slider from 'react-slick';
import LocationMapFinder from '../../../../../../components/LocationMapFinder';
import ImageUploaderModal from '../../../../../../components/ImageUploaderModal';

const styles = theme => ({
  forms: {
    width: '100%',
  },
  buttonWrapper: {
    position: 'relative',
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
  constructor(props) {
    super(props);
    const { event } = this.props;
    this.state = {
      title: event.title,
      subTitle: event.subTitle,
      price: event.price,
      shopName: event.shop.name,
      shopLocation: event.shop.location,
      shopLocationDetail: event.shop.locationDetail,
      shopPhone: event.shop.phone,
      maxPeople: event.maxPeople,
      datetimes: event.datetimes.map(o => new Date(o)), // 딥카피 제거
      datetimeInput: '',
      images: event.images,
      desc: event.desc,
      sponsorName: event.sponsor.name,
      sponsorPhone: event.sponsor.phone,
      sponsorEmail: event.sponsor.email,
      level: event.level,
      replyOn: event.replyOn ? 1 : 0,
      refundRule: event.refundRule,
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
      refundRule,
      images,
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
      refundRule,
      images,
    });
  };
  render() {
    const {
      classes,
      disabled,
    } = this.props;
    const {
      title,
      subTitle,
      price,
      datetimes,
      datetimeInput,
      maxPeople,
      desc,
      shopName,
      shopLocation,
      shopLocationDetail,
      shopPhone,
      sponsorName,
      sponsorPhone,
      sponsorEmail,
      level,
      replyOn,
      refundRule,
      images,
      isLocationMapFinderOpen,
      isImageUploaderModalOpen,
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
          이벤트 수정
        </Typography>
        <TextField
          className={classes.forms}
          id="title"
          label="타이틀"
          type="text"
          value={title}
          onChange={this.handleInputChange('title')}
          margin="dense"
          disabled={disabled}
        />
        <TextField
          className={classes.forms}
          id="subTitle"
          label="부가설명"
          helperText="리스트에 상세 설명 대신 나오는 부가 설명"
          type="text"
          multiline
          value={subTitle}
          onChange={this.handleInputChange('subTitle')}
          margin="dense"
          disabled={disabled}
        />
        <TextField
          id="price"
          label="가격"
          fullWidth
          value={price}
          type="number"
          onChange={this.handleInputChange('price')}
          margin="normal"
          disabled={disabled}
        />
        <div>
          <Typography gutterBottom>
            날짜 및 시각 입력
          </Typography>
          <TextField
            id="datetime"
            type="datetime-local"
            fullWidth
            onChange={this.handleInputChange('datetimeInput')}
            margin="dense"
            disabled={disabled}
          />
          <Button
            color="primary"
            disabled={datetimeInput === '' || disabled}
            onClick={() => {
              const arr = this.state.datetimes;
              if (arr.findIndex(o => new Date(o).getTime() === new Date(datetimeInput).getTime()) < 0) {
                arr.push(new Date(datetimeInput));
                arr.sort((a, b) =>
                  new Date(a).getTime() - new Date(b).getTime()
                );
                this.setState({ datetimes: arr });
              }
            }}
          >
            추가하기
          </Button>
          <Typography gutterBottom>
            입력된 날짜 및 시각
          </Typography>
          <ul>
            {
              datetimes.map(o => (
                <li key={o}>
                  {o.toLocaleString()}
                  <Button
                    color="primary"
                    onClick={() => {
                      const arr = this.state.datetimes;
                      arr.splice(arr.indexOf(o), 1);
                      this.setState({
                        datetimes: arr,
                      });
                    }}
                    disabled={disabled}
                  >
                    <DeleteIcon className={classes.icon}/>삭제
                  </Button>
                </li>
              ))
            }
          </ul>
        </div>
        <TextField
          id="maxPeople"
          label="최대 참석 인원"
          fullWidth
          value={maxPeople}
          type="number"
          onChange={this.handleInputChange('maxPeople')}
          margin="dense"
          disabled={disabled}
        />
        <TextField
          id="desc"
          label="설명"
          fullWidth
          multiline
          value={desc}
          onChange={this.handleInputChange('desc')}
          margin="dense"

          disabled={disabled}
        />
        <TextField
          id="shopName"
          label="장소 이름"
          fullWidth
          value={shopName}
          onChange={this.handleInputChange('shopName')}
          margin="dense"
          disabled={disabled}
        />
        <Button
          color="primary"
          onClick={() => this.setState({
            isLocationMapFinderOpen: true,
          })}
          disabled={disabled}
        >
          <MapIcon className={classes.icon}/>
          장소 선택
        </Button>
        <TextField
          id="shopLocation"
          label="장소 위치"
          fullWidth
          value={shopLocation}
          disabled
          onChange={this.handleInputChange('shopLocation')}
          margin="dense"
        />
        <TextField
          id="shopLocationDetail"
          label="장소 세부위치"
          fullWidth
          value={shopLocationDetail}
          onChange={this.handleInputChange('shopLocationDetail')}
          margin="dense"

          disabled={disabled}
        />
        <TextField
          id="shopPhone"
          label="장소 전화번호"
          fullWidth
          value={shopPhone}
          onChange={this.handleInputChange('shopPhone')}
          margin="dense"

          disabled={disabled}
        />
        <TextField
          id="sponsorName"
          label="주최자 이름"
          fullWidth
          value={sponsorName}
          onChange={this.handleInputChange('sponsorName')}
          margin="dense"

          disabled={disabled}
        />
        <TextField
          id="sponsorPhone"
          label="주최자 전화번호"
          fullWidth
          value={sponsorPhone}
          onChange={this.handleInputChange('sponsorPhone')}
          margin="dense"

          disabled={disabled}
        />
        <TextField
          id="sponsorEmail"
          label="주최자 이메일"
          fullWidth
          value={sponsorEmail}
          onChange={this.handleInputChange('sponsorEmail')}
          margin="dense"

          disabled={disabled}
        />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="level">고객 레벨</InputLabel>
          <Select
            native
            value={level}
            onChange={this.handleInputChange('level')}
            inputProps={{
              id: 'level',
            }}

            disabled={disabled}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </Select>
          <FormHelperText>고객레벨 1은 1레벨 고객(기본 가입 고객)에게만 보여집니다. 2는 1,2레벨 고객에게, 3은 1,2,3레벨 고객에게 보여집니다.</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="replyOn">댓글 허용 여부</InputLabel>
          <Select
            native
            value={replyOn}
            onChange={this.handleInputChange('replyOn')}
            inputProps={{
              id: 'replyOn',
            }}

            disabled={disabled}
          >
            <option value={1}>허용</option>
            <option value={0}>비허용</option>
          </Select>
        </FormControl>
        <TextField
          id="refundRule"
          label="환불 규정"
          helperText="기본 환불 규정입니다. 특이사항 없을 시 수정 또는 삭제하지마십시요."
          fullWidth
          multiline
          value={refundRule}
          onChange={this.handleInputChange('refundRule')}
          margin="dense"
          disabled={disabled}
        />
        <Typography
          variant="headline"
        >
          이미지
        </Typography>
        <Slider {...settings}>
          {
            images.map((img) => (
              <img key={img.path} className={classes.img} src={img.path} />
            ))
          }
        </Slider>
        <div className={classes.iconWrapper}>
          <Button
            style={{ marginTop: '20px', marginBottom: '15px' }}
            color="primary"
            onClick={() => this.setState({
              isImageUploaderModalOpen: true,
            })}
          >
            <SettingIcon className={classes.icon}/>이미지 수정
          </Button>
        </div>
        <div className={classes.iconWrapper}>
          <Button
            color="primary"
            onClick={this.handleSubmit}
          >
            <SettingIcon className={classes.icon}/>이벤트 수정
          </Button>
        </div>
        <LocationMapFinder
          open={isLocationMapFinderOpen}
          onClose={() => this.setState({
            isLocationMapFinderOpen: false,
          })}
          onSubmit={({ location, locationDetail }) => this.setState({
            shopLocation: location,
            shopLocationDetail: locationDetail,
          })}
        />
        <ImageUploaderModal
          open={isImageUploaderModalOpen}
          onClose={() => this.setState({
            isImageUploaderModalOpen: false,
          })}
          onSubmit={images => this.setState({
            images: images.filter(i => i.path),
          })}
        />
      </React.Fragment>
    )
  }
}
export default withStyles(styles)(From);
