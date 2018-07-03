import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Block from './components/Block';
import TermModal from './components/TermModal';
import rules from '../../../../rules';

const styles = {
  title: {
    fontSize: 32,
  },
  next: {
    marginTop: 16,
    borderRadius: 0,
  },
  titleImg: {
    width: 200,
  },
  titleImgWrapper: {
    background: 'white',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
class Terms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstChecked: false,
      isSecondChecked: false,
      isTermModalOpen: false,
      termModal: {
        title: '',
        content: '',
      },
    };
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  render() {
    const {
      classes,
      handleNext,
    }  = this.props;
    const {
      isFirstChecked,
      isSecondChecked,
      isTermModalOpen,
      termModal,
    } = this.state;
    return (
      <Fragment>
        <div className={classes.titleImgWrapper}>
          <img className={classes.titleImg} src="/title.PNG"/>
        </div>
        <Block
          title="이용약관"
          content={rules.ruleForUse}
          checked={isFirstChecked}
          onChange={this.handleChange('isFirstChecked')}
          onZoom={() => this.setState({
            isTermModalOpen: true,
            termModal: {
              title: '이용약관',
              content: rules.ruleForUse,
            },
          })}
        />
        <Block
          title="개인정보처리방침"
          content={rules.ruleForInfo}
          checked={isFirstChecked}
          onChange={this.handleChange('isSecondChecked')}
          onZoom={() => this.setState({
            isTermModalOpen: true,
            termModal: {
              title: '개인정보처리방침',
              content: rules.ruleForInfo,
            },
          })}
        />
        <Button
          className={classes.next}
          fullWidth
          color="primary"
          variant="raised"
          size="large"
          disabled={!isFirstChecked || !isSecondChecked}
          onClick={handleNext}
        >
          확인
        </Button>
        <TermModal
          open={isTermModalOpen}
          title={termModal.title}
          content={termModal.content}
          onClose={() => this.setState({
            isTermModalOpen: false,
          })}
        />
      </Fragment>
    );
  }
}
export default withStyles(styles)(Terms);
