import React, {useState, useEffect} from "react";
import AddTodo from "../AddTodo/AddTodo";
import TodoCard from "../TodoCard/TodoCard";
import EditTodo from "../EditTodo/EditTodo";
import axios from "axios";

function TodoList() {
    const [createTodo, setCreateTodo] = useState(false)
    const [modifyTodo, setModifyTodo] = useState(false)
    const [etitle, setETitle] = useState('')
    const [edesc, setEDesc] = useState('')
    const [eid, setEID] = useState('')
    const [todos, setTodos] = useState([])

    const getTodo = async() =>{
      try{
        const {data}=await axios.get(`http://localhost:4000/get`)
        localStorage.setItem("todos", JSON.stringify(data));
        }catch(err){
          alert(err)
        }
    }
    useEffect(()=>{
      setTodos(JSON.parse(localStorage.getItem("todos")))
      getTodo()
    },[])

   

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center header">
        <div className="text-center">
          <h1>Todo List</h1>
          <button className="btn add-btn mt-3 pointer" onClick={()=>setCreateTodo(true)}>Create Todo</button>
        </div>
      </div>
      <div className="container">
        <h4 className="my-5">My Todo</h4>
        <div className="row">
        {todos.map((e,i)=>{
            return(
            <div className="col-md-3 py-3" key={i}>
                <TodoCard title={e.title} desc={e.description} id={e._id} etitle={setETitle} edesc={setEDesc} eid={setEID} edit={setModifyTodo} />
            </div>

            )
        })}
        </div>
      </div>
      {createTodo && 
      <AddTodo state={setCreateTodo}/>}
      {modifyTodo && 
      <EditTodo state={setModifyTodo} tit={etitle} desc={edesc} id={eid} />}
    </div>
  );
}

export default TodoList;
