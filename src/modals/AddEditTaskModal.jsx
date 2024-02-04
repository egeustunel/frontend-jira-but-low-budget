import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import columnsSlice from "../redux/columnsSlice";
import api from "../utils/api";
import Datepicker from "react-tailwindcss-datepicker";
import { useNavigate } from "react-router-dom";

function AddEditTaskModal({
  type,
  device,
  setIsTaskModalOpen,
  setIsAddTaskModalOpen,
  taskIndex,
  prevColIndex = 0,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const columns = useSelector((state) => state.columns);
  const users = useSelector((state) => state.users.users);

  const col = columns.find((col, index) => index === prevColIndex);
  const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];
  const [status, setStatus] = useState(columns[prevColIndex].name);

  const [assignee, setAssignee] = useState(task ? task.userId : users[0].id);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const [dueDate, setDueDate] = useState({
    startDate: task?.dueDate ? new Date(Date.parse(task?.dueDate)) : new Date(),
    endDate: task?.dueDate ? new Date(Date.parse(task?.dueDate)) : new Date()
    });

  const handleDueDateChange = (newValue) => {
    setDueDate(newValue);
  };
  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onChangeAssignee = (e) => {
    setAssignee(e.target.value);
  };

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }

    setIsValid(true);
    return true;
  };

  if (type === "edit" && isFirstLoad) {
    setTitle(task.title);
    setDescription(task.description);
    setIsFirstLoad(false);
  }

  const onSubmit = (type) => {
    if (type === "add") {
      api
        .post("/task", {
          title,
          description,
          userId: Number(assignee),
          status: newColIndex + 1,
          dueDate: dueDate.startDate.toISOString().split('T')[0],
        })
        .then(() => {
          dispatch(
            columnsSlice.actions.addTask({
              title,
              description,
              status: newColIndex + 1,
              dueDate: dueDate.startDate,
              assignee,
              newColIndex,
            })
          );
          navigate(0);
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    } else {
      api
        .post("/task/update", {
          id: task.id,
          title,
          description,
          userId: Number(assignee),
          status: newColIndex + 1,
          dueDate: dueDate.startDate.toISOString().split('T')[0],
        })
        .then(() => {
          dispatch(
            columnsSlice.actions.editTask({
              title,
              description,
              status,
              dueDate: dueDate.startDate.toUTCString(),
              assignee,
              newColIndex,
            })
          );
        })
        .catch((err) => {
          console.log("err: ", err);
        });
      dispatch(
        columnsSlice.actions.editTask({
          title,
          description,
          status,
          assignee,
          taskIndex,
          prevColIndex,
          newColIndex,
        })
      );
    }
  };

  return (
    <div
      className={
        device === "mobile"
          ? "  py-6 px-6 pb-40  absolute left-0 flex  right-0 bottom-[-100vh] top-0 dropdown "
          : "  py-6 px-6 pb-40  absolute left-0 flex  right-0 bottom-0 top-20 dropdown "
      }
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsAddTaskModalOpen(false);
      }}
    >
      {/* Modal Section */}

      <div
        className=" scrollbar-hide  max-h-[95vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl"
      >
        <h3 className=" text-lg ">
          {type === "edit" ? "Edit" : "Add New"} Task
        </h3>

        {/* Task Name */}

        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="task-name-input"
            type="text"
            className=" bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
          />
        </div>

        {/* Description */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="task-description-input"
            className=" bg-transparent outline-none min-h-[200px] focus:border-0 px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px] "
          />
        </div>

        {/* Due Date */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Due Date
          </label>
          <Datepicker
            primaryColor={"teal"}
            asSingle={true}
            value={dueDate}
            onChange={handleDueDateChange}
          />
        </div>

        {/* assignee  */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm dark:text-white text-gray-500">
            Assignee
          </label>
          <select
            value={assignee}
            onChange={onChangeAssignee}
            className=" select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>

        {/* current Status  */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            value={status}
            onChange={onChangeStatus}
            className=" select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
          >
            {columns.map((column) => (
              <option key={column.id}>{column.name}</option>
            ))}
          </select>
          <button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onSubmit(type);
                setIsAddTaskModalOpen(false);
                type === "edit" && setIsTaskModalOpen(false);
              }
            }}
            className=" w-full items-center text-white bg-[#635fc7] py-2 rounded-full "
          >
            {type === "edit" ? "Save" : "Create task"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditTaskModal;
