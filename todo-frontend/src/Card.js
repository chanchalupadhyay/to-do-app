import React from "react";
import "./App.css"

  function Card(props){

     console.log( props.completed)
 
     return(
    // style={{backgroundColor:`rgb(245, 244, 219)`}} 
            <div >
            <div class="card">

            <span onClick={()=>props.onDeleteTodo(props.id)} style={{color:'red'}}>x</span>
            <br/>
            <div className={` card-content ${ props.completed ? "completed":""}`}> 
                {props.task}  
             <br/>
             <br/>
            <button onClick={()=>props.onCompleteTodo(props.id)}>Done</button>
            </div>
            </div>
           </div>
    )
}

export default Card;

