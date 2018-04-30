import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Block from './components/Block';
import Reply from './components/Reply';
import EventCalendar from '../../../../components/EventCalendar';
import LocationMap from '../../../../components/LocationMap';

const styles = theme => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      padding: 20,
    },
    paddingBottom: 20,
  },
  calendar: {
    margin: 'auto',
    marginBottom: 20,
  },
});
class Content extends React.Component {
  render() {
    const {
      classes,
      event,
      handleReplySubmit,
      handleReplyRemove,
      account,
    } = this.props;
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
      <div className={classes.root}>
        <EventCalendar
          events={event.datetimes}
          className={classes.calendar}
        />
        <Block
          title="일시"
          text={datetimeText}
        />
        <Block
          title="강의 소개"
          text={event.desc}
        />
        <Block
          title="강사"
          text={event.sponsor.name}
        />
        <Block
          title="가격"
          text={`${event.price}원`}
        />
        <Block
          title="최대 참여 인원"
          text={`${event.maxPeople}명`}
        />
        <Block
          title="장소"
          text={`${event.shop.location} ${event.shop.locationDetail}`}
        >
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
        </Block>
        <Block
          title="환불 규정"
          text={event.refundRule}
        />
        <Block
          title="주최자 연락처"
        >
          <Typography><strong>전화번호</strong>{` : ${event.sponsor.phone}`}</Typography>
          <Typography><strong>이메일</strong>{` : ${event.sponsor.email}`}</Typography>
        </Block>
        {
          event.replyOn ?
            <Reply
              reply={event.reply}
              handleSubmit={handleReplySubmit}
              handleRemove={handleReplyRemove}
              account={account}
            /> :
            null
        }
      </div>
    )
  }
}
export default withStyles(styles)(Content);
