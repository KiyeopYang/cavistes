import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import IconEvent from '@material-ui/icons/Event';
import IconPrice from '@material-ui/icons/AttachMoney';
import IconMap from '@material-ui/icons/Map';
import IconGroup from '@material-ui/icons/Group';
import IconLecturer from '@material-ui/icons/RecordVoiceOver';
import IconLecture from '@material-ui/icons/Assignment';
import IconRefund from '@material-ui/icons/ErrorOutline';
import IconPhone from '@material-ui/icons/Call';
import Block from './components/Block';
import Reply from './components/Reply';
import EventCalendar from '../../../../components/EventCalendar';
import LocationMap from '../../../../components/LocationMap';

const styles = theme => ({
  root: {
    paddingBottom: 20,
  },
  calendar: {
    margin: 'auto',
    marginBottom: 20,
    border: 0,
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
          Icon={IconEvent}
          title="일시"
          text={datetimeText}
        />
        <Block
          Icon={IconLecture}
          title="강의 소개"
          text={event.desc}
        />
        <Block
          Icon={IconLecturer}
          title="강사"
          text={event.sponsor.name}
        />
        <Block
          Icon={IconPrice}
          title="가격"
          text={`${event.price}원`}
        />
        <Block
          Icon={IconGroup}
          title="최대 참여 인원"
          text={`${event.maxPeople}명`}
        />
        <Block
          Icon={IconMap}
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
          Icon={IconPhone}
          title="주최자 연락처"
        >
          <Typography><strong>전화번호</strong>{` : ${event.sponsor.phone}`}</Typography>
          <Typography><strong>이메일</strong>{` : ${event.sponsor.email}`}</Typography>
        </Block>
        <Block
          Icon={IconRefund}
          title="환불 규정"
          text={event.refundRule}
        />
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
