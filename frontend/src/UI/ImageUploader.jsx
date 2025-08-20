import MediaGallery from "@/components/CommonUi/MediaUploader/MediaGallery";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { fileTypeChecker, stringShorter } from "./../utils/functions";

export default function ImageUploader({
  isMultiple,
  images,
  setImages,
  maxCount,
  filter,
}) {
  const handleRemoveImage = (img) => {
    const newImages = images.filter((image) => image.id !== img.id);
    setImages(newImages);
  };

  const onInsert = (selectedImage) => {
    setImages(selectedImage);
  };

  return (
    <>
      <div>
        <div className="flex flex-wrap gap-2">
          {images.map((img) => {
            const { isImage, typeText } = fileTypeChecker(img.fileType);
            return (
              <div key={img.id} className="relative">
                {isImage ? (
                  <img
                    src={`${import.meta.env.VITE_APP_API}media/view/${img.id}`}
                    alt={img.fileName}
                    className="w-24 h-24 object-cover rounded"
                  />
                ) : (
                  <div className="h-24 w-24 bg-slate-400/20 relative overflow-hidden rounded">
                    <span className="text-lg font-semibold text-blue-600 opacity-20 h-full w-full flex justify-center items-center ">
                      <span>{typeText}</span>
                    </span>
                    <div className="absolute text-center bottom-0 w-full left-0 p-1  text-xs font-semibold">
                      {stringShorter(img.fileName, 60)}
                    </div>
                  </div>
                )}
                <div className="absolute top-0 right-0">
                  <button
                    onClick={() => handleRemoveImage(img)}
                    className="text-red-500 p-1 rounded-full">
                    <MdOutlineRemoveCircleOutline size={20} />
                  </button>
                </div>
              </div>
            );
          })}

          <MediaGallery
            isMultiple={isMultiple}
            onInsert={onInsert}
            maxCount={maxCount}
            filter={filter}
          />
        </div>
      </div>
    </>
  );
}
