import React from 'react';
import Layout from './components/Layout';
import Form from './components/Form';

class UpdateModal extends React.Component {
  render() {
    const {
      open,
      onClose,
      event,
      handleUpdate,
    } = this.props;
    return (
      <Layout
        open={open}
        onClose={onClose}
      >
        <Form
          event={event}
          handleSubmit={handleUpdate}
        />
      </Layout>
    );
  }
}
export default UpdateModal;
