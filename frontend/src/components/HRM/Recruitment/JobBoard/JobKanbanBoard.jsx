import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import AddStatusColumn from "./AddStatusColumn";
import Application from "./Application";
import DeleteJobApplicationStatus from "./DeleteJobApplicationStatus";
import Loader from "@/components/Loader/Loader";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadAllJobApplicationStatus } from "@/redux/rtk/features/hrm/jobApplicationStatus/jobApplicationStatusSlice";
import { updateJobApplication } from "@/redux/rtk/features/hrm/jobApplication/jobApplicationSlice";

function JobKanbanBoard() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  // const [newColumnTitle, setNewColumnTitle] = useState("");

  const { jobApplicationStatus: list, loading } = useSelector(
    (state) => state.jobApplicationStatus
  );

  const [btnId, setBtnId] = useState(null);

  useEffect(() => {
    if (list) {
      setData(list);
    }
  }, [list]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === "column") {
    } else {
      const sourceColumn = data.find(
        (column) => "column" + column.id === source.droppableId
      );
      const destinationColumn = data.find(
        (column) => "column" + column.id === destination.droppableId
      );

      if (sourceColumn === destinationColumn) {
        const newJobApplication = Array.from(sourceColumn.jobApplication);
        sourceColumn.jobApplication.map((application) => {
          if ("jobApplication" + application.id === draggableId) {
            newJobApplication.splice(source.index, 1);
            newJobApplication.splice(destination.index, 0, application);
          }
        });
        const newColumn = {
          ...sourceColumn,
          jobApplication: newJobApplication,
        };
        const newColumns = data.map((column) => {
          if (column.id === newColumn.id) {
            return newColumn;
          }
          return column;
        });
        setData(newColumns);
      } else {
        const sourceJobApplication = Array.from(sourceColumn.jobApplication);
        sourceJobApplication.splice(source.index, 1);

        const newSourceColumn = {
          ...sourceColumn,
          jobApplication: sourceJobApplication,
        };

        const destinationJobApplication = Array.from(
          destinationColumn.jobApplication
        );
        sourceColumn.jobApplication.map((application) => {
          if ("jobApplication" + application.id === draggableId) {
            destinationJobApplication.splice(destination.index, 0, application);
          }
        });

        const newDestinationColumn = {
          ...destinationColumn,
          jobApplication: destinationJobApplication,
        };

        const newColumns = data.map((column) => {
          if (column.id === newSourceColumn.id) {
            return newSourceColumn;
          } else if (column.id === newDestinationColumn.id) {
            return newDestinationColumn;
          } else {
            return column;
          }
        });

        setData(newColumns);
      }

      const jobApplicationId = draggableId.split("jobApplication")[1];
      const applicationStatusId = destination.droppableId.split("column")[1];
      // make json data
      const sendData = {
        applicationStatusId: applicationStatusId,
      };
      dispatch(
        updateJobApplication({
          id: jobApplicationId,
          values: sendData,
        })
      );
    }
  };
  useEffect(() => {
    dispatch(loadAllJobApplicationStatus());
  }, [dispatch]);
  return (
    <div className="" style={{ height: "97%" }}>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold antialiased text-gray-600">
          JOB BOARD{" "}
        </h1>
        <AddStatusColumn />
      </div>
      {list?.length ? (
        <div className="flex overflow-x-scroll" style={{ height: "100%" }}>
          <DragDropContext onDragEnd={handleDragEnd}>
            {data.map((column, columnIndex) => (
              <div
                key={column.id}
                className="p-4 "
                style={{ minWidth: "350px", height: "40vw" }}>
                <div
                  className="new-card shadow overflow-y-auto scrollbar-hide bg-gray-100 rounded-[1rem]"
                  style={{ height: "100%" }}>
                  <Droppable
                    droppableId={"column" + column.id}
                    key={"column" + column.id}>
                    {(provided, snapshot) => (
                      <ul
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="p-5 "
                        style={{ height: "100%" }}>
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-[16px] font-semibold txt-color-2 capitalize text-slate-700">
                            {column.applicationStatus}
                          </h2>
                          <div className="flex justify-end">
                            <DeleteJobApplicationStatus id={column.id} />
                          </div>
                        </div>
                        {column?.jobApplication?.map((application, index) => (
                          <Draggable
                            key={"jobApplication" + application.id}
                            draggableId={"jobApplication" + application.id}
                            index={index}>
                            {(provided, snapshot) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="rounded-lg px-1 py-1 cursor-move flex justify-between items-center">
                                <Application
                                  application={application}
                                  btnLoading={loading} //this loading grap from delete item
                                  btnId={btnId}
                                />
                              </li>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </div>
              </div>
            ))}
          </DragDropContext>
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center h-96">
          <Loader />
        </div>
      ) : (
        <div className="flex justify-center items-center h-96">
          <div>
            <h1 className="text-3xl font-semibold text-gray-600">
              No Job Application Found
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobKanbanBoard;
