import React from 'react';
import 'antd/dist/antd.css';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const FileUploader = (props) => {
console.log(props)
 const uploaded = {
  name: 'file',
  defaultFileList:props.fileList,
  maxCount: 1,
  // accept: ".png, .jpg, .jpeg, .gif, .tiff",
  // beforeUpload(file) {
  // const isLt2M = file.size > 1;
  // if (!isLt2M) {
  // message.error("Image must smaller than 2MB!");
  // }
  // return isLt2M;
  // },
  
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

  onChange(info) {
    props.onUploadFile(info, props.id)
    const { status } = info.file;
    if (status !== 'uploading') { 
      console.log(info.file, info.fileList);
    }

    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } 
    // else if (status === 'error') {
    //   message.error(`${info.file.name} file upload failed.`);
    // }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

  return (
    <Dragger {...uploaded} className="parent">
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
  </Dragger>
  );
};

export default FileUploader;