import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Slider from 'react-slick';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingIcon from '@material-ui/icons/Settings';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Layout from '../ModalLayout';
import ImageUploaderModal from '../../../../components/ImageUploaderModal';
import RemoveModal from '../../../../components/RemoveModal';

const styles = theme => ({
  title: {
    fontSize: 24,
  },
  submit: {
    marginTop: 16,
  },
  text: {
    whiteSpace: 'pre-line',
  },
  slider: {
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  content: {
    marginTop: 26,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  paper: {
    boxShadow: 'none',
  },
  settingWrapper: {
    width: '100%',
    textAlign: 'right',
    padding: 4,
    marginTop: theme.spacing.unit * 2,
  },
  iconWrapper: {
    width: '100%',
    textAlign: 'right',
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
});
class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      images: [{
        path: '/caviste.PNG'
      }],
      isImageUploaderModalOpen: false,
      isRemoveModalOpen: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open && nextProps.mode === 'create') {
      this.setState({
        title: '',
        text: '',
        images: [{
          path: '/caviste.PNG'
        }],
      });
    }
    if (JSON.stringify(this.props.selected) !== JSON.stringify(nextProps.selected)) {
      const { title, text, images } = nextProps.selected;
      this.setState({
        title,
        text,
        images,
      });
    }
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleSubmit = () => {
    this.props.handleSubmit(this.state);
  };
  render() {
    const {
      title,
      text,
      images,
      isImageUploaderModalOpen,
      isRemoveModalOpen,
    } = this.state;
    const {
      open,
      onClose,
      mode,
      classes,
      managerMode,
      handleRemove,
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
      <Layout
        open={open}
        onClose={onClose}
      >
        <Card className={classes.paper}>
          <div className={classes.slider}>
            <Slider {...settings}>
              {
                images.map((img) => (
                  <img
                    src={img.path}
                    key={img.path}
                  />
                ))
              }
            </Slider>
          </div>
        {managerMode ?
          <CardContent className={classes.content}>
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
            </div>
            <TextField
              required
              fullWidth
              label="타이틀"
              value={title}
              onChange={this.handleChange('title')}
            />
            <TextField
              required
              fullWidth
              multiline
              label="내용"
              value={text}
              onChange={this.handleChange('text')}
            />
            <div className={classes.iconWrapper}>
              <Button
                className={classes.submit}
                color="primary"
                onClick={this.handleSubmit}
              >
                {mode === 'create' ?
                  <CreateIcon className={classes.icon}/>
                  : <SettingIcon className={classes.icon}/>}
                {mode === 'create' ? '생성' : '수정'}
              </Button>
              {
                mode === 'update' ?
                  <Button
                    className={classes.submit}
                    color="primary"
                    onClick={() => this.setState({
                      isRemoveModalOpen: true,
                    })}
                  >
                    <DeleteIcon className={classes.icon}/>삭제
                  </Button> : null
              }
            </div>
          </CardContent> :
          <CardContent className={classes.content}>
            <Typography variant="headline" component="h2" gutterBottom>
              <strong>{title}</strong>
            </Typography>
            <Typography className={classes.text} variant="body2" component="p" gutterBottom>
              {text}
            </Typography>
          </CardContent>
        }
        </Card>
        <ImageUploaderModal
          open={isImageUploaderModalOpen}
          onClose={() => this.setState({
            isImageUploaderModalOpen: false,
          })}
          onSubmit={images => this.setState({
            images: images.filter(i => i.path),
          })}
        />
        <RemoveModal
          open={isRemoveModalOpen}
          onClose={() => this.setState({
            isRemoveModalOpen: false,
          })}
          handleRemove={handleRemove}
        />
      </Layout>
    );
  }
}
export default withStyles(styles)(EditModal);
