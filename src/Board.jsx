import React, { useMemo, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Modal, Button, Form } from "react-bootstrap";
import NewNavbar from "./fixedComponent/new-navbar/newnavbar";
import {NSidebar} from "./fixedComponent/new-sidebar/nSidebar";
import "./style.css"

const itemsFromBackend = [
  {
    id:'1',
    heading_name: "Project Name",
    content: "First tasktasktask task tasktasktask",
  },
  {
    id:' 2',
    heading_name: "Project Name",
    content:
      "Second tasktasktask task tasktasktasktask tasktasktasktasktasktasktask tasktasktask",
  },
  {
    id:' 3',
    heading_name: "Project Name",
    content: "Third tasktasktask task tasktasktask",
  },
  {
    id:' 4',
    heading_name: "Project Name",
    content: "Fourth tasktasktask task tasktasktask",
  },
  {
    id:' 5',
    heading_name: "Project Name",
    content: "Fifth tasktasktask task tasktasktask",
  },
  {
    id:' 6',
    heading_name: "Project Name",
    content: "First tasktasktask task tasktasktask",
  },
  {
    id:' 7',
    heading_name: "Project Name",
    content:
      "Second tasktasktask task tasktasktasktask tasktasktasktasktasktasktask tasktasktask",
  },
  {
    id:' 8',
    heading_name: "Project Name",
    content: "Third tasktasktask task tasktasktask",
  },
  {
    id:' 9',
    heading_name: "Project Name",
    content: "Fourth tasktasktask task tasktasktask",
  }
  
];

const columnsFromBackend = [
  {
    name: "Requested",
    items: itemsFromBackend,
  },
  {
    name: "To do",
    items: [],
  },
  {
    name: "In Progress",
    items: [],
  },

  {
    name: "Done",
    items: [],
  },
];

///////////////// On kanban change api fetching part///////////////////////////////////////////////////////////

function Board1() {
  const [columns, setColumns] = useState(columnsFromBackend);
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    ///////////////if it is droped in another column/////////////////////////
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      console.log("destination", destination);
      console.log("source", sourceItems);

      if (destination.droppableId == 0) {
        console.log("0 api call");
      } else if (destination.droppableId == 1) {
        console.log("1 api call");
        console.log(destItems);
      } else if (destination.droppableId == 2) {
        console.log("2 api call");
      } else {
        console.log("3 api call");
      }

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    }
    ///////////////if it is droped in same column/////////////////////////
    else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      console.log("else bhitra");
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  const [show, setShow] = useState(false);
  const [newitem, setnewitem] = useState({});

  const handlemouse = (item) =>{
    setnewitem(item);
    console.log(item);

  } 

  const handleShow = () =>{
    setShow(!show);
    setnewitem({})
  } 
    
  return (
    <div className="dashboard-main-body">
      <NewNavbar />
      < NSidebar />

      <div className="pdm-body2">
        <h2 className="pdf-pform">Kanban Board</h2>
        <div className="boards-container">
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div
                  className="boards"
                  key={columnId}
                  // onClick={() => console.log(columnId)}
                >
                  <p className="kanban-column-name">{column.name}</p>
                  <div className="board-content">
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? "#e6e6e6	"
                                : "#f0f0f0",
                              padding: 4,
                              borderRadius: 5,
                              width: 300,
                              minHeight: 700,
                            }}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                  
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",

                                          backgroundColor: snapshot.isDragging
                                            ? "#9DADBE"
                                            : "#fff",

                                          ...provided.draggableProps.style,
                                        }}
                                        className="tasks"
                                      >
                                        {columnId ==
                                        columnsFromBackend.length - 1 ? (
                                          <i
                                            class="fa-solid fa-check"
                                            style={{
                                              float: "right",
                                              color: "#8ad812",
                                              marginLeft: "20px !important",
                                            }}
                                          ></i>
                                        ) : null}

                                        <div className="tasks-div"
                                         onClick={()=>{
                                           handleShow();
                                           handlemouse(item);
                                         }
                                        }
                                        
                                        >
                                             {/* <MyVerticallyCenteredModal
        show={show}
        id={newitem.id}
        onHide={() => setShow(false)}
      /> */}
      

                                          <Modal show={show} 
                                          // onHide={handlemodalclose} 
                                          >
        <Modal.Header closeButton>
          
          <Modal.Title>{newitem.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{newitem.content}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleShow}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      


                                          <span className="task-code">
                                            {item.heading_name}
                                          </span>
                                          <span className="task-date">
                                            2022/09/13
                                          </span>
                                          <p className="task-title">
                                            {item.heading_name}
                                          </p>
                                          
                                          <p className="task-des">
                                            {item.content}
                                          </p>
                                        </div>
                                        <div>
                                          <button className="priority-btn">
                                            Priority
                                          </button>
                                          <i class="fa fa-paperclip icon-p"></i>
                                          <span className="count-attach">
                                            0
                                          </span>
                                          <img
                                            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                                            alt=""
                                            className="member-image"
                                          />
                                        </div>
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default Board1;


