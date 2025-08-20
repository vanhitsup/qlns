import { List } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadAllAnnouncement } from "@/redux/rtk/features/hrm/announcement/announcementSlice";
import { AiTwotoneNotification } from "react-icons/ai";

const AnnouncementBar = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.announcement);

  useEffect(() => {
    dispatch(loadAllAnnouncement({ query: "all" }));
  }, [dispatch]);

  return (
    <div>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={list || []}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<AiTwotoneNotification size={30} />}
              title={<p className="text-base font-medium ml-4">{item.title}</p>}
              description={
                <div className="flex items-center">
                  <p className="text-sm text-gray-500 ml-4">
                    {item.description}
                  </p>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};
export default AnnouncementBar;
