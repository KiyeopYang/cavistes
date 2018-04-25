import React, { Component } from 'react'

import FineUploaderTraditional from 'fine-uploader-wrappers'
import Gallery from 'react-fine-uploader'

// ...or load this specific CSS file using a <link> tag in your document
import 'react-fine-uploader/gallery/gallery.css'


const isFileGone = status => {
  return [
    'canceled',
    'deleted',
  ].indexOf(status) >= 0
};

class UploadComponent extends Component {
  constructor(props) {
    super(props);
    this.uploader = new FineUploaderTraditional({
      options: {
        chunking: {
          enabled: true
        },
        deleteFile: {
          enabled: true,
          endpoint: '/api/uploads/img'
        },
        request: {
          endpoint: '/api/uploads/img'
        },
        retry: {
          enableAuto: true
        },
        callbacks: {
          onComplete: this.props.onComplete,
        },
      }
    });
  }
  render() {
    return (
      <Gallery
        fileInput-children={<span>업로드</span>}
        uploader={ this.uploader }
      />
    )
  }
}

export default UploadComponent;
