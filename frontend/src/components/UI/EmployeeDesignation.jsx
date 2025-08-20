import { Alert } from "antd";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { deleteDesignationHistory } from "../../redux/rtk/features/hrm/designationHistory/designationHistorySlice";
import { loadSingleStaff } from "../../redux/rtk/features/hrm/user/userSlice";
import CommonDelete from "../CommonUi/CommonDelete";
import BtnDeleteSvg from "./Button/btnDeleteSvg";
import DesignationTimelineSvg from "./DesignationTimelineSVG";
import DesignationEditSinglePopup from "./PopUp/PopUp/DesignationEditSinglePopup";

const EmployeeDesignation = ({ list, edit, setLoading }) => {
  const { id } = useParams("id");

  return (
    <div>
      <main className='container mx-auto w-full flex justify-center mt-5'>
        <ol className='border-l-2 border-slate-600'>
          {list?.length ? (
            list?.map((item, index) => {
              return (
                <li key={index}>
                  <div className='md:flex flex-start'>
                    <DesignationTimelineSvg />
                    <div className='block p-6  max-w-md ml-6 mb-5 '>
                      <div className='flex justify-between mb-4'>
                        <h3 className='font-medium text-base mr-20 w-500 txt-color-2'>
                          {item?.designation?.name}
                        </h3>

                        <h3 className='font-medium text-base mr-20 w-500 txt-color-2'>
                          {dayjs(item?.startDate).format("MMM YYYY")} -{" "}
                          {item?.endDate
                            ? dayjs(item?.endDate).format("MMM YYYY")
                            : "Present"}
                        </h3>

                        <div>
                          <DesignationEditSinglePopup
                            data={item}
                            setLoading={setLoading}
                          />

                          <CommonDelete
                            permission={"delete-designationHistory"}
                            icon={
                              <button>
                                <BtnDeleteSvg size={20} />
                              </button>
                            }
                            deleteThunk={deleteDesignationHistory}
                            id={item.id}
                            loadThunk={loadSingleStaff}
                            query={id}
                          />
                        </div>
                      </div>

                      <h3 className='font-medium text-sm mr-20 w-500 txt-color-2'>
                        Comment :{" "}
                        <span className='font-medium  text-sm txt-color-secondary'>
                          {item?.comment}
                        </span>
                      </h3>
                      <h3 className='font-medium text-sm mr-20 w-500 txt-color-2'>
                        Start Date :{" "}
                        <span className='font-medium  text-sm txt-color-secondary'>
                          {" "}
                          {dayjs(item?.startDate).format("DD/MM/YYYY")}
                        </span>
                      </h3>

                      <h3 className='font-medium text-sm mr-20 w-500 txt-color-2'>
                        End Date :{" "}
                        <span className='font-medium  text-sm txt-color-secondary'>
                          {item?.endDate
                            ? dayjs(item?.endDate).format("DD/MM/YYYY")
                            : "Present"}
                        </span>
                      </h3>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <div className='mb-10'>
              <p className='text-center mt-3 mb-3'>
                No Designation History Found
              </p>
              <Alert
                message='Not found , Click on edit button to add new'
                type='info'
                showIcon
              />
            </div>
          )}
        </ol>
      </main>
    </div>
  );
};

export default EmployeeDesignation;
