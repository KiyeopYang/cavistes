import React from 'react';
import Layout from './components/Layout';
import Terms from './components/Terms';

class TermModal extends React.Component {
  render() {
    const { open, onClose } = this.props;
    return (
      <Layout
        open={open}
        onClose={onClose}
      >
        <Terms handleNext={onClose}/>
      </Layout>
    );
  }
}
export default TermModal;
