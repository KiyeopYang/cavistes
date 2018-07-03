import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import LocationMap from '../LocationMap';

const styles = theme => ({
  submit: {
    marginTop: 16,
  },
});
class LocationMapFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationStringInput: '',
      locationString: '',
      locationDetailStringInput: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.setState({
        locationStringInput: '',
        locationString: '',
        locationDetailStringInput: '',
      });
    }
  }
  handleChange = name => (e) => {
    this.setState({
      [name]: e.target.value,
    })
  };
  render() {
    const {
      classes,
      open,
      onClose,
      fullScreen,
      onSubmit,
    } = this.props;
    const {
      locationString,
      locationStringInput,
      locationDetailStringInput,
    } = this.state;
    return (
      <Dialog
        fullScreen={fullScreen}
        aria-labelledby="locationMapFinder"
        aria-describedby="locationMapFinder_description"
        open={open}
        onClose={onClose}
      >
        <DialogTitle>
          주소 찾기
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              onChange={this.handleChange('locationStringInput')}
              value={locationStringInput}
              fullWidth
              label="주소"
              helperText="번지수 또는 건물 번호 ex)서울시 강남구 대치동 949번지"
            />
            <Button
              type="submit"
              color='primary'
              fullWidth
              onClick={(e) => {
                e.preventDefault();
                this.setState({
                  locationString: locationStringInput,
                });
              }}
            >
              찾기
            </Button>
          </form>
          <div>
            {
              locationString !== '' ?
                <Fragment>
                  <Typography
                    gutterBottom
                    align="center"
                  >
                    <strong>
                    아래 지도에서의 위치를 반드시 확인 부탁드립니다.
                    </strong>
                  </Typography>
                  <LocationMap
                    string={locationString}
                    styles={{
                      border: 0,
                      height: '400px',
                    }}
                    display="initial"
                    position="relative"
                    frameBorder="0"
                  />
                  <form>
                    <TextField
                      label="세부 주소"
                      helperText="ex)수암빌딩 1층"
                      onChange={this.handleChange('locationDetailStringInput')}
                      value={locationDetailStringInput}
                      fullWidth
                    />
                    <Button
                      type="submit"
                      className={classes.submit}
                      color='primary'
                      variant="raised"
                      fullWidth
                      onClick={(e) => {
                        e.preventDefault();
                        onSubmit({
                          location: locationString,
                          locationDetail: locationDetailStringInput,
                        });
                        onClose();
                      }}
                    >
                      확인
                    </Button>
                  </form>
                </Fragment> : null
            }
          </div>
        </DialogContent>
        <DialogActions>
        {
          fullScreen ?
            <Button
              color="primary"
              onClick={onClose}
              size="large"
            >
              취소
            </Button> : null
        }
        </DialogActions>
      </Dialog>
    )
  }
}
export default withMobileDialog()(withStyles(styles)(LocationMapFinder));
