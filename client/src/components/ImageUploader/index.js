import React, { Component } from 'react'

import FineUploaderTraditional from 'fine-uploader-wrappers'
import Gallery from 'react-fine-uploader'

// ...or load this specific CSS file using a <link> tag in your document
import 'react-fine-uploader/gallery/gallery.css'
import './styles.css';

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
        fileInput-accept="image/*"
        fileInput-children={<span>이미지 업로드 (1MB 이하)</span>}
        dropzone-disabled
        status-text={{
          uploading: '업로드 중',
          upload_failed: '실패',
          upload_successful: '업로드 완료',
          retrying_upload: '재시도 중',
        }}
        uploader={ this.uploader }
      >
        <span/>
      </Gallery>
    )
  }
}

export default UploadComponent;
