import dayjs from "dayjs";
import React from "react";
import { useParams } from "react-router-dom";
import { deleteEducation } from "../../redux/rtk/features/hrm/education/educationSlice";
import { loadSingleStaff } from "../../redux/rtk/features/hrm/user/userSlice";
import CommonDelete from "../CommonUi/CommonDelete";
import BtnDeleteSvg from "./Button/btnDeleteSvg";
import EducationEditSinglePopup from "./PopUp/PopUp/EducationEditSinglePopup";
import TimeLineSvg from "./TimeLineSvg";

const EmployeeTimeline = ({ list, edit }) => {
  const { id } = useParams("id");
  return (
    <div>
      <main className='container mx-auto w-full flex justify-center mt-5'>
        <ol className='border-l-2 border-slate-600'>
          {list &&
            list?.map((item) => {
              return (
                <li key={item.id}>
                  <div className='md:flex flex-start'>
                    <TimeLineSvg />
                    <div className='block p-6  max-w-md ml-6 mb-5 '>
                      <div className='flex justify-between mb-4'>
                        <h3 className='font-medium text-base mr-20 w-500 txt-color-2'>
                          {item?.degree || "No Degree"}
                        </h3>

                        <h3 className='font-medium text-base mr-20 w-500 txt-color-2'>
                          {dayjs(item?.studyStartDate).format("MMM YYYY")} -{" "}
                          {item?.studyEndDate
                            ? dayjs(item?.studyEndDate).format("MMM YYYY")
                            : "Present"}
                        </h3>
                        {edit && (
                          <div>
                            <EducationEditSinglePopup
                              data={item}
                            />
                            <CommonDelete
                              permission={"delete-education"}
                              icon={
                                <button>
                                  <BtnDeleteSvg size={20} />
                                </button>
                              }
                              deleteThunk={deleteEducation}
                              id={item.id}
                              loadThunk={loadSingleStaff}
                              query={id}
                            />
                          </div>
                        )}
                      </div>

                      <h3 className='font-medium text-sm mr-20 w-500 txt-color-2'>
                        Field of Study :{" "}
                        <span className='font-medium text-sm txt-color-secondary'>
                          {item?.fieldOfStudy}
                        </span>
                      </h3>

                      <h3 className='font-medium text-sm mr-20 w-500 txt-color-2'>
                        Institute :{" "}
                        <span className='font-medium text-sm txt-color-secondary'>
                          {item?.institution}
                        </span>
                      </h3>

                      <h3 className='font-medium text-sm mr-20 w-500 txt-color-2'>
                        Result :{" "}
                        <span className='font-medium text-sm txt-color-secondary'>
                          {item?.result}
                        </span>
                      </h3>
                    </div>
                  </div>
                </li>
              );
            })}
        </ol>
      </main>
    </div>
  );
};

export default EmployeeTimeline;
