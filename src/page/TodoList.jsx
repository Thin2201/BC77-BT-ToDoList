import React, { useEffect, useState } from "react";
import axios from "axios";

const TodoList = () => {
  const [arrTodoList, setArrTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");

  const getAllStask = async () => {
    try {
      const res = await axios.get(
        "https://svcy.myclass.vn/api/ToDoList/GetAllTask"
      );
      setArrTodoList(res.data);
    } catch (error) {
      console.error("ERROR");
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      await axios.post("https://svcy.myclass.vn/api/ToDoList/AddTask", {
        taskName: newTask,
      });
      setNewTask("");
      getAllStask();
    } catch (error) {
      console.error("Error add", error);
    }
  };

  const deleteTask = async (taskName) => {
    try {
      await axios.delete(
        `https://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`
      );
      getAllStask();
    } catch (error) {
      console.error("Error delete", error);
    }
  };
  const completeTask = async (taskName) => {
    try {
      await axios.put(
        `https://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`
      );
      getAllStask();
    } catch (error) {
      console.error("Error complete", error);
    }
  };
  const rejectTask = async (taskName) => {
    try {
      await axios.put(
        `https://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`
      );
      getAllStask();
    } catch (error) {
      console.error("Error rejecting task:", error);
    }
  };

  useEffect(() => {
    getAllStask();
  }, []);
  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-red-500 my-4">Todo List</h1>
      <div className=" bg-slate-300 p-2 rounded-md">
        <div className="add py-4">
          <input
            value={newTask}
            onChange={(e) => {
              setNewTask(e.target.value);
            }}
            type="text"
            className="w-2/3 rounded-md p-2"
            placeholder="Enter new Product"
          />
          <button
            onClick={addTask}
            className="px-8 py-2 mx-4 bg-blue-400 rounded-md"
            type="submit"
          >
            Add
          </button>
        </div>
        <ul className="content bg-slate-300rounded-md">
          <li className="my-8">
            {arrTodoList.map((task) => {
              return (
                <div
                  key={task.taskName}
                  className="product flex gap-4 bg-white rounded-md items-center my-4"
                >
                  <h2 className=" text-left text-lg w-3/4 px-2">
                    {task.taskName}
                  </h2>
                  <div className="w-1/4 justify-between py-2">
                    <button
                      onClick={() => {
                        completeTask(task.taskName);
                      }}
                      className="bg-green-400 rounded-md p-2 mx-2"
                    >
                      Complete
                    </button>
                    <button
                      className="bg-red-500 rounded-md p-2 w-1/3"
                      // onClick={() => {deleteTask{task.taskName}}}
                      onClick={() => {
                        deleteTask(task.taskName);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </li>
          <div className="my-4">
            {arrTodoList
              .filter((task) => task.status)
              .map((task) => {
                return (
                  <div
                    key={task.taskName}
                    className="product flex gap-4 bg-green-300 rounded-md items-center my-4"
                  >
                    <h2 className=" text-left text-lg w-3/4 px-2">
                      {task.taskName}
                    </h2>
                    <div className="w-1/4 justify-between py-2 ">
                      <button className="bg-orange-400 rounded-md p-2 mx-2 w-1/3">
                        Reject
                      </button>
                      <button
                        className="bg-red-500 rounded-md p-2 w-1/3"
                        onClick={() => {
                          deleteTask(task.taskName);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
