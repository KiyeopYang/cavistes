import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Slider from 'react-slick';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import OwnerButtons from '../../components/OwnerButtons';
import Reply from './components/Reply';
import EventCalendar from '../../../../components/EventCalendar';
import LocationMap from '../../../../components/LocationMap';

const styles = theme => ({
  card: {
    borderRadius: 0,
    marginBottom: 15,
  },
  media: {
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
  root2: {
    width: '100%',
  },
  titleWrapper: {
    background: theme.palette.primary.main,
  },
  title: {
    fontSize: 24,
    // paddingTop: 10,
    // paddingBottom: 10,
    // paddingLeft: 20,
    // paddingRight: 20,
    [theme.breakpoints.down('sm')]: {
      // fontSize: 20,
      // paddingTop:  10,
      // paddingBottom: 10,
      // paddingLeft: 20,
      // paddingRight: 20,
    },
  },
  paragraph: {
    fontSize: 18,
    whiteSpace: 'pre-line',
    [theme.breakpoints.down('sm')]: {
      // fontSize: 16,
    },
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
  subHeading: {
    display: 'flex',
    color: '#CF0F0F',
    fontSize: 18,
    // paddingLeft: 20,
    // paddingRight: 20,
    [theme.breakpoints.down('sm')]: {
      // fontSize: 16,
      // paddingLeft: 20,
      // paddingRight: 20,
    },
  },
  greyText: {
    color: '#9C9C9C',
  },
  cardContent: {
    padding: 40,
    [theme.breakpoints.down('sm')]: {
      padding: 20,
    },
  },
  divider: {
    width: '100%',
    height: 1,
    background: 'grey',
    marginTop: 25,
    marginBottom: 25,
  },
  left: {
    display: 'inline-block',
    width: 300,
    marginRight: 30,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginRight: 0,
    },
  },
  right: {
    display: 'inline-block',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  calendar: {
    margin: 'auto',
    marginTop: 30,
    marginBottom: 30,
    border: 0,
    background: 'rgb(248, 248, 248)',
  },
  subTitle: {
    display: 'flex',
    marginBottom: 4,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  label: {
    marginRight: 12,
    width: 30,
  },
  container: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  preLine: {
    whiteSpace: 'pre-line',
  },
  datetimes: {
    whiteSpace: 'pre-line',
  },
  blockLabel: {
    flex: 'none',
    color: theme.palette.primary.main,
    width: 75,
    marginRight: 8,
  },
  desc: {
    whiteSpace: 'pre-line',
  },
  locationWrapper: {
    width: '100%',
  },
  toListBtnWrapper: {
    width: '100%',
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
  toListBtn: {
    border: '1px solid grey',
    fontFamily: 'CircularBook',
    borderRadius: 0,
    height: 35,
    width: 220,
  },
});
function makeDateText(date) {
  return `${date.getUTCFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
}
class Front extends React.Component {
  render() {
    const {
      classes,
      images,
      event,
      handler,
      handleReplySubmit,
      handleReplyRemove,
      account,
    } = this.props;
    let dateText = makeDateText(event.datetimes[0]);
    if (event.datetimes.length > 1) {
      dateText = `${dateText}부터 ${event.datetimes.length}회`;
    }
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
    };
    let datetimeText = '';
    event.datetimes.forEach((o) => {
      const year = o.getUTCFullYear();
      const month = o.getMonth() + 1;
      const date = o.getDate();
      const hour = o.getHours();
      const min = o.getMinutes();
      datetimeText = datetimeText.concat(
        `${year}년 ${month}월 ${date}일 ${hour}시 ${min}분\n`
      );
    });

    return (
      <React.Fragment>
        <Card
          className={classes.card}
          elevation={0}
        >
          <div className={classes.media}>
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
          {
            handler ?
              <OwnerButtons onClick={handler}/> : null
          }
          <CardContent className={classes.cardContent}>
            <div className={classes.root2}>
              <Typography className={classes.title}>
                <strong>{event.title}</strong>
              </Typography>
              <Hidden smDown>
                <div className={classes.divider}/>
              </Hidden>
              <div className={classes.container}>
                <div className={classes.left}>
                  <div className={classes.subTitle}>
                    <Typography className={classes.label}>
                      <strong>일정</strong>
                    </Typography>
                    <Typography
                      className={classes.selectable}
                    >
                      {
                        `${
                          event.datetimes[0].getUTCFullYear()
                          }.${
                        event.datetimes[0].getMonth()+1
                          }.${
                          event.datetimes[0].getDate()
                          }`
                      }
                      {
                        `${event.datetimes.length > 1 ? `부터 ${event.datetimes.length}회`: ''}`
                      }
                    </Typography>
                  </div>
                  <div className={classes.subTitle}>
                    <Typography className={classes.label}>
                      <strong>회비</strong>
                    </Typography>
                    <Typography>
                      {`${event.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`}
                    </Typography>
                  </div>
                  <div className={classes.subTitle}>
                    <Typography className={classes.label}>
                      <strong>장소</strong>
                    </Typography>
                    <Typography>
                      {event.shop.name}
                    </Typography>
                  </div>
                  <div className={classes.subTitle}>
                    <Typography className={classes.label}>
                      <strong>인원</strong>
                    </Typography>
                    <Typography>
                      {
                        `${event.attendees.length}/${event.maxPeople}명`
                      }
                    </Typography>
                  </div>
                  <EventCalendar
                    events={event.datetimes}
                    className={classes.calendar}
                  />
                  <div className={classes.subTitle}>
                    <Typography className={classes.label}>
                      <strong>일시</strong>
                    </Typography>
                    <Typography className={classes.preLine}>
                      {
                        datetimeText
                      }
                    </Typography>
                  </div>
                </div>
                <Hidden mdUp>
                  <div className={classes.divider}/>
                </Hidden>
                <div className={classes.right}>
                  <div className={classes.root}>
                    <div className={classes.subTitle}>
                      <Typography className={classes.blockLabel}>
                        <strong>강의 소개</strong>
                      </Typography>
                      <Typography className={classes.preLine}>
                        {
                          event.desc
                        }
                      </Typography>
                    </div>
                    <div className={classes.divider}/>
                    <div className={classes.subTitle}>
                      <Typography className={classes.blockLabel}>
                        <strong>강의 장소</strong>
                      </Typography>
                      <div className={classes.locationWrapper}>
                        <Typography>
                          {
                            `${event.shop.location} ${event.shop.locationDetail}`
                          }
                        </Typography>
                        <LocationMap
                          string={event.shop.location}
                          frameBorder="0"
                          styles={{
                            border: 0,
                            height: '400px',
                          }}
                          display="initial"
                          position="relative"
                          allowFullScreen
                        />
                      </div>
                    </div>
                    <div className={classes.divider}/>
                    <div className={classes.subTitle}>
                      <Typography className={classes.blockLabel}>
                        <strong>강의 문의</strong>
                      </Typography>
                      <div>
                        <Typography>전화번호{` : ${event.sponsor.phone}`}</Typography>
                        <Typography>이메일{` : ${event.sponsor.email}`}</Typography>
                      </div>
                    </div>
                    <div className={classes.divider}/>
                    <div className={classes.subTitle}>
                      <Typography className={classes.blockLabel}>
                        <strong>환불 규정</strong>
                      </Typography>
                      <Typography className={classes.preLine}>
                        {event.refundRule}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {
          event.replyOn ?
            <Card
              className={classes.card}
              elevation={0}
            >
              <CardContent className={classes.cardContent}>
                <Reply
                  reply={event.reply}
                  handleSubmit={handleReplySubmit}
                  handleRemove={handleReplyRemove}
                  account={account}
                />
              </CardContent>
            </Card>:
            null
        }
        <div className={classes.toListBtnWrapper}>
          <Button
            className={classes.toListBtn}
            color="primary"
            onClick={this.props.toList}
          >
            LIST
          </Button>
        </div>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(Front);
