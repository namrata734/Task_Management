import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import "./dashboard.css";
import { v4 } from "uuid";
import _ from "lodash";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Dashboard = () => {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
    // let input = {
    //   id: "",
    //   name: "",
    //   desc: "",
    // };

    // fetch("http://localhost:5000/api/todo")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     //console.log(state.todo);
    //     data.map((each) => {
    //       console.log(each);
    //       input.id = each._id;
    //       input.name = each.name;
    //       input.desc = each.desc;
    //       state.todo.items.push(input);
    //     });
    //     console.log(state.todo);
    //     setstate(state);
    //   });
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log("till here");
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const item = {
    id: v4(),
    name: "Frontend",
    desc: " As a Content Annotator, I should be able add tags in colleges,sSo that colleges can improve",
  };
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [state, setstate] = useState({
    todo: {
      title: "To Do",
      items: [item],
    },
    "in-progress": {
      title: "In Progress",
      items: [],
    },
    completed: {
      title: "Completed",
      items: [],
    },
  });

  const handleDragEnd = ({ source, destination }) => {
    if (!destination) {
      console.log("dropping anywhere");
      return;
    }
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      console.log("dropped in same place");
      return;
    }

    //creating a copy of items
    const itemCopy = { ...state[source.droppableId].items[source.index] };
    //console.log(itemCopy);
    setstate((prev) => {
      prev = { ...prev };

      // remove from prev items array
      prev[source.droppableId].items.splice(source.index, 1);

      // add to destination array
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );
      return prev;
    });
  };

  const addItem = () => {
    setstate((prev) => {
      return {
        ...prev,
        todo: {
          title: "To Do",
          items: [
            {
              id: v4(),
              name: name,
              desc: desc,
            },
            ...prev.todo.items,
          ],
        },
      };
    });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { name, desc };
      console.log("entering", body);
      const response = await fetch("http://localhost:5000/api/todo", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      console.log("ewfwes");
      const parseRes = await response.json();
      setName("");
      setDesc("");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="rightside">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="row">
          <div id="project"> Project </div>
          <div className="inputs">
            <form onSubmit={onSubmitForm}>
              Title:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              Description:
              <input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <button className="add" type="submit" onClick={addItem}>
                +
              </button>
            </form>
          </div>
        </div>

        <div className="todos">
          <DragDropContext onDragEnd={handleDragEnd}>
            {_.map(state, (data, key) => {
              return (
                <div className="status">
                  <div className="head">
                    {data.title} <span>total</span>
                  </div>
                  <div></div>
                  <Droppable droppableId={key}>
                    {(provided) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="colms"
                        >
                          {data.items.map((el, index) => {
                            return (
                              <Draggable
                                key={el.id}
                                index={index}
                                draggableId={el.id}
                              >
                                {(provided) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.dragHandleProps}
                                      {...provided.draggableProps}
                                      className="todo"
                                    >
                                      <div className="title">{el.name}</div>
                                      <div className="description">
                                        {el.desc}
                                      </div>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              );
            })}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
