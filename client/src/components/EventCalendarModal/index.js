import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EventCalendar from '../EventCalendar';

const styles = theme => ({
  selectedDate: {
    background: theme.palette.primary.main,
    color: 'white',
  },
});
const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
class EventCalendarModal extends React.Component {
  parseEvent = (date) => {
    const year = date.getUTCFullYear();
    const month = date.getMonth() + 1;
    const d = date.getDate();
    const day = date.getDay();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${year}년 ${month}월 ${d}일(${DAYS[day]}) ${hours}시 ${minutes}분`;
  };
  render() {
    const { selectedEvent, open, onClose } = this.props;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={onClose}
      >
        <div style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          position: 'absolute',
        }}>
          <EventCalendar
            events={selectedEvent}
          />
          <Typography variant="subheading" align="center">
            {`총 ${selectedEvent.length} 회`}
          </Typography>
          {
            selectedEvent.map(event => (
              <Typography key={event} align="center">
                {this.parseEvent(event)}
              </Typography>
            ))
          }
          <Button
            color="primary"
            variant="raised"
            fullWidth
            onClick={onClose}
          >
            닫기
          </Button>
        </div>
      </Modal>
    )
  }
}
export default withStyles(styles)(EventCalendarModal);
