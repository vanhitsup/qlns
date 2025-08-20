import Button from "@/UI/Button";
import {
  addMedia,
  loadAllMediaPaginated,
} from "@/redux/rtk/features/media/mediaSlice";
import { cn } from "@/utils/functions";
import { Modal } from "antd";
import { useState } from "react";
import { BiUpload } from "react-icons/bi";
import { useDispatch } from "react-redux";
import Images from "./Images";
import UploaderWithDrag from "./UploaderWithDrag";

export default function MediaGallery({
  isOpen,
  isMultiple = false,
  onInsert,
  maxCount,
  button,
  filter,
}) {
  const dispatch = useDispatch();
  const [isOpenLocal, setIsOpen] = useState(isOpen);
  const [fileList, setFileList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("gallery");
  const [selectedImage, setSelectedImage] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleInsert = () => {
    onInsert && onInsert(selectedImage);
    setSelectedImage([]);
    setIsOpen(false);
  };

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
      dispatch(loadAllMediaPaginated({ page: 1, count: 10 }));
    }
    setUploadLoading(false);
  };

  return (
    <>
      {button ? (
        <span onClick={() => setIsOpen(true)}>{button}</span>
      ) : (
        <div
          onClick={() => setIsOpen(true)}
          className='bg-gray-300 rounded w-[100px] h-[100px] flex items-center justify-center cursor-pointer'
        >
          <BiUpload size={30} className='text-blue-500' />
        </div>
      )}
      <Modal
        title='Insert Media'
        width={window.innerWidth > 768 ? "80%" : "100%"}
        className='imageGalleryModal'
        centered
        open={isOpenLocal}
        footer={null}
        onCancel={() => setIsOpen(false)}
      >
        {/* // Image Gallery goes here */}
        <div className='flex flex-col h-[calc(95vh-60px)] md:h-[calc(85vh-60px)]'>
          <div className='border-b shadow-[0,10px,15px,-3px,rgba(0,0,0,0.1),0,4px,6px,-4px,rgba(0,0,0,0.1)]'>
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
          <div className='flex-grow overflow-y-auto my-2 relative'>
            {selectedStatus === "gallery" ? (
              <Images
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                isMultiple={isMultiple}
                maxCount={maxCount}
                filter={filter}
              />
            ) : (
              <UploaderWithDrag fileList={fileList} setFileList={setFileList} />
            )}
          </div>
          {/* footer */}
          <div>
            <div className='flex justify-end gap-4'>
              <div className='flex gap-2'>
                <Button
                  disabled={uploadLoading}
                  color='gray'
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                {selectedStatus === "gallery" ? (
                  <Button
                    disabled={selectedImage.length <= 0}
                    onClick={handleInsert}
                    color='primary'
                  >
                    Insert
                  </Button>
                ) : (
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
      </Modal>
    </>
  );
}
