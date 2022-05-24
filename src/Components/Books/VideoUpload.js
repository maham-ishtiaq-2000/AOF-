import React from 'react';
import 'antd/dist/antd.css';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

 const VideoUpload =()=>{
const props = {
  action: '//jsonplaceholder.typicode.com/posts/',
  accept: ".mp4, .flv, .MPEG-4, .MOV, .WMV",
  listType: 'video',
  previewFile(file) {
    console.log('Your upload file:', file);
    // Your process logic. Here we just mock to the same file
    return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
      method: 'POST',
      body: file,
    })
      .then(res => res.json())
      .then(({ thumbnail }) => thumbnail);
  },
};

return(
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Upload</Button>
  </Upload>
);
}

export default VideoUpload