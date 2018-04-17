import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Block from './components/Block';
import EventCalendar from '../../../../components/EventCalendar';
import LocationMap from '../../../../components/LocationMap';

const styles = theme => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      padding: 20,
    },
  },
  calendar: {
    margin: 'auto',
    marginBottom: 20,
  },
});
class Content extends React.Component {
  render() {
    const { classes, selectedEvent } = this.props;
    return (
      <div className={classes.root}>
        <EventCalendar
          events={selectedEvent}
          className={classes.calendar}
        />
        <Block
          title="일시"
          text={`2018년 4월 1일 오후 7시 30분
          2018년 4월 8일 오후 7시 30분
          2018년 4월 15일 오후 7시 30분
          2018년 4월 22일 오후 7시 30분`}
        />
        <Block
          title="모임 소개"
          text={`와인 문화 공간 카비시트에서 와인 중급 강좌 3기를 모집합니다.
          강좌는 2회로 이루어지며 프랑스의 각 와인 산지, 세계의 유명한 와인 산지들에 대해 배우고 각 산지의 명품 와인에 대해 듣는 시간을 마련하였습니다.
          해당 강의에 맞는 특별한 시음 와인이 제공됩니다. 많은 참여 부탁드립니다.`}
        />
        <Block
          title="강사"
          text={`이민우 (라피트 로칠드 한국 대표)`}
        />
        <Block
          title="와인 리스트"
          text={`Chateau Haut Bailly 2008
          Chateau Haut Bailly 2011
          Chateau Haut Bailly 2013
          Chateau Haut Bailly 2018`}
        />
        <Block
          title="가격"
          text={`150,000원`}
        />
        <Block
          title="참여 인원"
          text={`10명`}
        />
        <Block
          title="장소"
          text={`서울시 강남구 대치동 949번지 수암빌딩 1층`}
        >
          <LocationMap
            string="서울시 강남구 대치동 949번지"
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
          title="특이사항"
        >
          <ul>
            <li>주차 가능</li>
          </ul>
        </Block>
        <Block
          title="문의"
        >
          <Typography><strong>전화번호</strong> : 02-622-2222</Typography>
          <Typography><strong>이메일</strong> : kiyeopyang@gmail.com</Typography>
        </Block>
      </div>
    )
  }
}
export default withStyles(styles)(Content);
