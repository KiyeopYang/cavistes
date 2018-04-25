import React from 'react';
import Layout from './components/Layout';
import Form from './components/Form';
import Table from './components/Table';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      open,
      onClose,
    } = this.props;
    return (
      <Layout
        open={open}
        onClose={onClose}
        title="신청자"
      >
        <Table rows={[{
          id:'1',
          name: '양기엽',
          phone: '010-2124-2322',
          gender: 'm',
        },
          {
            id:'2',
            name: '양기엽2',
            phone: '010-2124-2322',
            gender: 'm',
          },
          {
            id:'3',
            name: '양기엽3',
            phone: '010-2124-2322',
            gender: 'm',
          },
        ]}/>
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  account: state.AccountManager.data.account,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  noticeDialogOn: noticeDialogActions.on,
  accountRequest: accountActions.request,
  authRequest: authActions.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login));
