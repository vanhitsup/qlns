import { EditOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import UserListCard from "./List/UserListCard";
import {
  clearDesignation,
  loadSingleDesignation,
} from "@/redux/rtk/features/hrm/designation/designationSlice";
import Loader from "@/components/Loader/Loader";
//PopUp

const DetailDesignation = () => {
  const { id } = useParams();

  //dispatch
  const dispatch = useDispatch();
  const designation = useSelector((state) => state.designations.designation);

  useEffect(() => {
    dispatch(loadSingleDesignation(id));
    return () => {
      dispatch(clearDesignation());
    };
  }, [dispatch, id]);

  return (
    <div>
      <div className="mr-top">
        {designation ? (
          <Fragment key={designation.id}>
            <Card bordered={false} style={{}}>
              <div className="flex justify-between" style={{ padding: 0 }}>
                <div className="w-50">
                  <h5 className="text-xl">
                    <span className="mr-left">{designation.name}</span>
                  </h5>
                </div>
                <div className="flex items-center text-end w-50">
                  <Link
                    className="mr-3 inline-block"
                    to={`/admin/designation/${designation.id}/update`}
                    state={{ data: designation }}>
                    <Button
                      type="primary"
                      shape="round"
                      icon={<EditOutlined />}></Button>
                  </Link>
                </div>
              </div>

              <UserListCard list={designation} />
            </Card>
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default DetailDesignation;
