import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import columnsSlice from "../redux/columnsSlice";
import Task from "./Task";
import api from "../utils/api";


function Column({ colIndex }) {

  const dispatch = useDispatch();
  const columns = useSelector((state) => state.columns);
  const col = columns.find((col, i) => i === colIndex);
  useEffect(() => {
    
  }, [dispatch]);



  const handleOnDrop = (e) => {
    const { prevColIndex, taskIndex, task } = JSON.parse(
      e.dataTransfer.getData("text")
    );

    if (colIndex !== prevColIndex) {
      api
      .post("/task/update", {
        id: task.id,
        status: Number(colIndex + 1),
      })
      .then(() => {
        dispatch(
          columnsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex })
        );
      })
      .catch((err) => {
        console.log("err: ", err);
      });
      
    }
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className="scrollbar-hide   mx-5 pt-[90px] min-w-[280px] "
    >
      <p className=" font-semibold flex  items-center  gap-2 tracking-widest text-[#828fa3]">
        {col.name} ({col.tasks.length})
      </p>

      {col.tasks.map((task, index) => (
        <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  );
}

export default Column;
