import React from 'react';
import { withStyles } from 'material-ui/styles';
import Slider from 'react-slick';
import Typography from 'material-ui/Typography';
import IconEvent from '@material-ui/icons/Event';
import IconPrice from '@material-ui/icons/AttachMoney';
import IconMap from '@material-ui/icons/Map';
import IconGroup from '@material-ui/icons/Group';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';

const styles = theme => ({
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
      fontSize: 20,
      // paddingTop: 10,
      // paddingBottom: 10,
      // paddingLeft: 20,
      // paddingRight: 20,
    },
  },
  paragraph: {
    fontSize: 18,
    whiteSpace: 'pre-line',
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
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
      fontSize: 16,
      // paddingLeft: 20,
      // paddingRight: 20,
    },
  },
  greyText: {
    color: '#9C9C9C',
  },
  cardContent: {
  },
});
function makeDateText(date) {
  return `${date.getUTCFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
}
class Front extends React.Component {
  render() {
    const { classes, images, event  } = this.props;
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
    return (
      <React.Fragment>
        <Card>
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
          <CardContent className={classes.cardContent}>
            <div className={classes.root2}>
              <Typography className={classes.title} gutterBottom>
                <strong>{event.title}</strong>
              </Typography>
              <div>
                <Typography className={classes.subHeading} gutterBottom>
                  <IconEvent className={classes.icon}/><strong>{dateText}</strong>
                </Typography>
                <Typography className={classes.subHeading} gutterBottom>
                  <IconPrice className={classes.icon}/><strong>참가비 {event.price}원</strong>
                </Typography>
                <Typography className={classes.subHeading} gutterBottom>
                  <IconMap className={classes.icon}/><strong>{event.shop.name}</strong>
                </Typography>
                <Typography className={classes.subHeading} gutterBottom>
                  <IconGroup className={classes.icon}/>
                  <strong>{event.attendees.length}/{event.maxPeople}명</strong>
                </Typography>
              </div>
            </div>
            {this.props.children}
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(Front);
