import Pagination from "@/UI/Pagination";
import Loader from "@/components/Loader/Loader";
import {
  clearMedia,
  loadAllMediaPaginated,
} from "@/redux/rtk/features/media/mediaSlice";
import { cn, fileTypeChecker, stringShorter } from "@/utils/functions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonSearch from "../CommonUi/CommonSearch";

export default function Images({ selectedImage, setSelectedImage }) {
  const dispatch = useDispatch();
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 36,
  });
  const { list, loading, total } = useSelector((state) => state.media);
  const [lastSelectedIndex, setLastSelectedIndex] = useState(null);
  const handleItemClick = (index, event) => {
    if (event.shiftKey) {
      const selected = list.slice(
        Math.min(index, lastSelectedIndex),
        Math.max(index, lastSelectedIndex) + 1
      );
      setSelectedImage(selected);
    } else {
      const selected = list[index];
      const isSelectedImage = selectedImage.find(
        (selected) => selected.id === list[index].id
      );
      if (isSelectedImage) {
        setSelectedImage((prev) =>
          prev.filter((img) => img.id !== list[index].id)
        );
      } else {
        setSelectedImage((prev) => [...prev, selected]);
        setLastSelectedIndex(index);
      }
    }
  };

  let content = null;
  if (loading) {
    content = <Loader />;
  } else if (list?.length > 0) {
    content = (
      <>
        <div className="flex flex-wrap gap-2">
          {list.map((img, index) => {
            const isSelectedImage = selectedImage.find(
              (selected) => selected.id === img.id
            );
            const { isImage, typeText } = fileTypeChecker(img.fileType);
            return (
              <div
                onClick={(e) => handleItemClick(index, e)}
                key={img.id}
                className={cn(
                  "border-2 border-transparent h-[100px] w-[100px] relative cursor-pointer bg-slate-400/20 overflow-hidden",
                  {
                    "border-blue-500": isSelectedImage,
                  }
                )}
                title={img.fileName}>
                {isImage ? (
                  <img
                    src={`${import.meta.env.VITE_APP_API}/media/view/${img.id}`}
                    alt={img.fileName}
                    className="content-center w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <span className="text-lg font-semibold text-blue-600 opacity-20 h-full w-full flex justify-center items-center">
                      <span>{typeText}</span>
                    </span>
                    <span className="absolute bottom-0 left-0 p-1 text-xs font-semibold">
                      <div className="mb-0.5">
                        {stringShorter(img.fileName, 60)}
                      </div>
                      <a
                        href={
                          import.meta.env.VITE_APP_API + "/media/view/" + img.id
                        }
                        download
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 hover:text-blue-600">
                        <span className="px-2 py-0.5 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                          Download
                        </span>
                      </a>
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </>
    );
  }
  const fetchData = (page, count) => {
    setPageConfig((prev) => {
      return { ...prev, page, count };
    });
  };
  useEffect(() => {
    dispatch(loadAllMediaPaginated(pageConfig));
    return () => {
      dispatch(clearMedia());
    };
  }, [dispatch, pageConfig]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-2  justify-between  pb-2 sticky top-0 bg-white w-full">
        <CommonSearch setPageConfig={setPageConfig} />
        <Pagination
          defaultPageSize={pageConfig.count}
          onChange={fetchData}
          total={total}
        />
      </div>
      {content}
    </>
  );
}
