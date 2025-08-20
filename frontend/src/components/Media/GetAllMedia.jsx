import Button from "@/UI/Button";
import {
  addMedia,
  deleteMedia,
  loadAllMediaPaginated,
} from "@/redux/rtk/features/media/mediaSlice";
import { cn } from "@/utils/functions";
import { Checkbox } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonDelete from "../CommonUi/CommonDelete";
import UploaderWithDrag from "../CommonUi/MediaUploader/UploaderWithDrag";
import Images from "./Images";

export default function GetAllMedia() {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.media);
  const [selectedStatus, setSelectedStatus] = useState("gallery");
  const [selectedImage, setSelectedImage] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleUpload = async () => {
    setUploadLoading(true);
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file.originFileObj);
    });
    const resp = await dispatch(addMedia(formData));
    if (resp.payload.message === "success") {
      setSelectedStatus("gallery");
      setFileList([]);
      dispatch(loadAllMediaPaginated({ page: 1, count: 36 }));
    }
    setUploadLoading(false);
  };

  const onSelectToggle = (e) => {
    if (e.target.checked) {
      setSelectedImage([...list]);
    } else {
      setSelectedImage([]);
    }
  };

  let content = null;
  if (selectedStatus === "gallery") {
    content = (
      <Images
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    );
  } else if (selectedStatus === "upload") {
    content = (
      <UploaderWithDrag fileList={fileList} setFileList={setFileList} />
    );
  }

  return (
    <>
      <div className='flex flex-col h-[calc(95vh-60px)] md:h-[calc(85vh-60px)]'>
        <div className='border-b shadow-[0,10px,15px,-3px,rgba(0,0,0,0.1),0,4px,6px,-4px,rgba(0,0,0,0.1)]'>
          <div className='flex justify-between items-end gap-2'>
            <div>
              {selectedStatus !== "upload" && (
                <>
                  <Checkbox onChange={onSelectToggle} className='mx-2 ' />
                  {selectedImage.length > 0 && (
                    <span className='text-sm mr-2'>{selectedImage.length}</span>
                  )}
                </>
              )}
              <button
                onClick={() => setSelectedStatus("gallery")}
                className={cn("px-2", {
                  "border-b-blue-500 border-b-2 font-medium":
                    selectedStatus === "gallery",
                })}
              >
                Media
              </button>
              <button
                onClick={() => setSelectedStatus("upload")}
                className={cn("px-2", {
                  "border-b-blue-500 border-b-2 font-medium":
                    selectedStatus === "upload",
                })}
              >
                Upload
              </button>
            </div>
            <div className='relative'>
              {selectedImage.length > 0 && (
                <div className='absolute -top-[30px] right-0'>
                  <CommonDelete
                    deleteThunk={deleteMedia}
                    id={selectedImage.map((img) => img.id)}
                    permission='delete-media'
                    loadThunk={loadAllMediaPaginated}
                    query={{ page: 1, count: 36 }}
                    className='text-lg text-red-500'
                    button={
                      <Button className='py-[2px] px-[4px] bg-red-500 hover:bg-red-600 text-white'>
                        Delete
                      </Button>
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='flex-grow overflow-y-auto my-2 relative'>{content}</div>
        {/* footer */}
        <div>
          <div className='flex justify-end gap-4'>
            <div className='flex gap-2'>
              {selectedStatus === "upload" && (
                <Button
                  loading={uploadLoading}
                  onClick={handleUpload}
                  color='primary'
                >
                  Upload
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
