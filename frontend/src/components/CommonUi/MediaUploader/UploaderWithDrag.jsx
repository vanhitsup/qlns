import Dragger from "antd/es/upload/Dragger";
import { BiCloudUpload } from "react-icons/bi";

export default function UploaderWithDrag({ fileList, setFileList }) {
  const handleDragger = (info) => {
    setFileList(info.fileList);
  };

  return (
    <div>
      <Dragger
        name='files'
        onChange={handleDragger}
        multiple={true}
        fileList={fileList}
        beforeUpload={() => false}
      >
        <div className='ant-upload-drag-icon flex justify-center my-2'>
          <BiCloudUpload size={30} />
        </div>
        <p className='ant-upload-text'>
          Click or drag file to this area to upload
        </p>
      </Dragger>
    </div>
  );
}
