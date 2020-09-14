import axios from "axios"

 const API_Url="http://localhost:5000/todos/"

 //createTodo(task) - accepts a task and sends a post via axios.post to our API_URL and returns the newTodo.
 // Note: axios stores the response of our requests in a field called data.



async function createTodo(task){
const {data: newTodo}=await axios.post(API_Url,{task})
return newTodo;
}

async function deleteTodo(id){
    const message = await axios.delete(`${API_Url}${id}`)
    return message
}
async function updateTodo(id,payload){
    const {data:newTodo}=await axios.put(`${API_Url}${id}`,payload)
    return newTodo
}

async function getAllTodo(){
    console.log("in getalltodo")
    const {data:todos}= await axios.get(API_Url)
    console.log(todos)
    return todos
}

export default {createTodo,updateTodo,deleteTodo,getAllTodo}