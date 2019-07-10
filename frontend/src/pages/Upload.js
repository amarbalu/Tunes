import React from 'react';
import { Upload, Icon, message,Typography } from 'antd';


const UploadLibrary=(props)=>{
  // http://localhost:4000
    const propsValue = {
        name: 'file',
        multiple: true,
        action: `${process.env.REACT_APP_API_URL}/music/upload`,
        onChange(info) {
          
          if(info.type=== "audio/mp3"){
          const { status } = info.file;
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
          }
        },
      };
    return(
        <div>
        <Typography.Title level={3}>Add to your library</Typography.Title>
<Upload.Dragger {...propsValue}>
<p className="ant-upload-drag-icon">
  <Icon type="inbox" />
</p>
<p className="ant-upload-text">Click or drag file to this area to upload</p>
<p className="ant-upload-hint">
  Support for a single or bulk upload. Strictly prohibit from uploading company data or other
  band files
</p>
</Upload.Dragger>
</div>
    )
}

export default UploadLibrary;
