
const express=require("express")
const app=express()
const http=require("http")
const sockets=require("socket.io")


const server = http.createServer(app)
const io=sockets(server)
let answers=[]

io.on("connection",(socket)=>{
    console.log("connected to "+ socket.id)

    socket.on("question",function(data){
        answers=[]
        io.sockets.emit("question",data)
    })

    socket.on("answer",function(data){
        answers.push(data.answer)

    })
})

app.use("/",express.static(__dirname))
app.get("/teacher",(r,s)=>s.sendFile("C:\\Users\\iampr\\WebstormProjects\\FB_liveques\\teacher.html"))
app.get("/student",(r,s)=>s.sendFile("C:\\Users\\iampr\\WebstormProjects\\FB_liveques\\student.html"))
app.get("/results",(r,s)=>{
    s.send(answers)
})
app.get("/s_assignment",(r,s)=>{s.sendFile("C:\\Users\\iampr\\WebstormProjects\\FB_liveques\\s_assignment.html")})
app.get("/t_assignment",(r,s)=>{s.sendFile("C:\\Users\\iampr\\WebstormProjects\\FB_liveques\\t_assignment.html")})



server.listen(8888,()=>{console.log("UP @ 8888")})