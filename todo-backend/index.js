const express= require("express")
const bodyParser =require("body-parser")
const cors=require("cors")
const path=require("path")
const db=require("./models/")
const app=express();


const PORT= process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());

function success(res,payload){
res.status(200).json(payload)
}

app.get("/",(req,res)=>{
   res.send("welcome")
})

app.get("/todos",async(req,res,next)=>{
   try{
      console.log(req)
      const todo = await db.Todo.find({}); // find all data , empty {} means all
      return success(res,todo)
   }
   catch(error){
    next({status:400,message:"failed to get todos"})
   }
})

app.post("/todos",async(req,res,next)=>{
   try{
      console.log(req)

      const todo=await db.Todo.create(req.body);
      return success(res,todo)
   }
   catch(error){
       next({status:400,message:"failed to create todos"})
   }
})

app.put("/todos/:id",async(req,res,next)=>{
   try{
      console.log(req)

      const todo = await db.Todo.findByIdAndUpdate(req.params.id, req.body,{ new: true})
    return success(res,todo)
   }
   catch(error){
       next({status:400,message:"failed yyy to update"})
   }
})

app.delete("/todos/:id",async(req,res,next)=>{
   try{
      await db.Todo.findByIdAndRemove(req.params.id)
      return success(res,"todo deleted")
   }
   catch(error){
      next({status:400,message:"failed to delete todos"})
   }
})

// error handler for all above next({..})
app.use((error, req, res, next) => {
   return res.status(error.status || 400).json({
     status: error.status || 400,
     message: error.message || "there was an error processing request",
   })
 })


// production shws we are working in local .. for heroku
 if(process.env.NODE_ENV ==="production"){
  
 app.use(express.static('todo-frontend/build'));
 
 app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","static","index.html"))
 })
}



app.listen(PORT,()=>{
   console.log( `lisnening on port ${PORT}`);
})


