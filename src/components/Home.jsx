import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Column from "./Column";
import api from "../utils/api";
import columnsSlice from "../redux/columnsSlice";
import usersSlice from "../redux/usersSlice";

function Home() {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const columns = useSelector((state) => state.columns);
  useEffect(() => {
    if (!tasks.length) {
      api.get("/task").then((res) => {
          let tasks = res.data;
          setTasks(tasks);
          tasks.forEach((task) => {
            dispatch(
              columnsSlice.actions.addToColumn({
                task,
              })
            );
          });
        })
        .catch((err) => {
          console.log("err: ", err);
        });
        api.get("/user").then((res) => {
          let users = res.data;
          setUsers(users);
          dispatch(
            usersSlice.actions.setUsers({
              users
            })
          );
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    }
  }, []);

  return (
    <div
      className={
        "bg-[#f4f7fd]  scrollbar-hide h-screen flex dark:bg-[#20212c]  overflow-x-scroll gap-6"
      }
    >
      <>
        {columns.map((col, index) => (
          <Column key={index} colIndex={index} />
        ))}
      </>
    </div>
  );
}

export default Home;
