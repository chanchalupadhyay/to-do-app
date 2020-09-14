import React, { useState, useEffect } from 'react';
import APIhelper from "./APIhelper"
import Card from "./Card"
import "./App.css"


class App extends React.Component{
 
  state={
    todo:"",
    todos:"",
  }

   componentDidMount(){
    const fetchAllTodos=async()=>{
      const getAllTodos= await APIhelper.getAllTodo();
      this.setState({todos:getAllTodos})
     
    } 
    fetchAllTodos();
  }

  handleChange=event=>{
    this.setState({todo:event.target.value})
    console.log(this.state.todo)
  }
  updateTodo=async(id)=>{
    console.log(id);
    const payload=
   { completed:!this.state.todos.find(data=>data._id===id).completed}

   const updatedTodo=await APIhelper.updateTodo(id,payload);

   // this.setState({todo:event.target.value})
  const updatedTodos=this.state.todos.map(todo=>(todo._id===id)?updatedTodo:todo)
   this.setState({todos:updatedTodos}) 
    console.log(this.state.todos)
    
  }

  
  deleteTodo=async(id)=>{
    try{
      await APIhelper.deleteTodo(id)
     const afterRemoveTodo=this.state.todos.filter(data => data._id !==id)
     this.setState({todos:afterRemoveTodo})
     console.log(this.state.todos)

    }
    catch(err){
      alert("Id not found")
    }
  }
  

  createTodo= async(e)=>{
    e.preventDefault();
      
    const todos=this.state.todos;
    const newTodo=this.state.todo;

    console.log(newTodo)
      
     if(!newTodo){
          alert("write something")
          return
          }
       
    if(todos.some(({task})=>task===newTodo)){
         alert(`${newTodo} is already exist`)
         return
         }
 
        const newCreatedTodo=await APIhelper.createTodo(newTodo)
        this.setState({todos:[...todos,newCreatedTodo]})
 

  }
  render(){
   
    return(
      <div className="app-container">
        <header>
         <h1>
          TO DO App
         </h1>

         <div className="input-todo">
           <input type="text" id="input-todo" value={this.state.todo} onChange={this.handleChange}/>
           <button onClick={this.createTodo}> Create new todo </button>
        </div>
        </header>

      
        <div className="section">

        <div className="card-container">
        {this.state.todos && this.state.todos.map((data,i)=>(
          <Card
          key={i}
          id={data._id}
          task={data.task}
          completed={data.completed}
          onDeleteTodo={id => this.deleteTodo(id)}
          // onDeleteTodo={ function(retured data id){ this.deleteTodo(retured data id)}}
          onCompleteTodo={id=>this.updateTodo(id)}
          
          
          />
          
          ))}
        </div>
        </div>
      </div>
    )
  }
}


















// function App() {
//   const [todos,setTodos]=useState([]);
//   const [todo,setTodo]=useState("");
  
//   useEffect(()=>{
//     APIhelper.getAllTodo();
  
//   },[])

  
//   return (
// <div>
//   <input type="text" id="input-todo" value={todo} onChange={(event)=>setTodo(event.value)}/>
//   <button>Add me</button>
//   <label id="display" value={todo}></label>
//   <li>  
//     <ul>

//     </ul>
//   </li> 
// </div>    
//   );
// }

export default App;
