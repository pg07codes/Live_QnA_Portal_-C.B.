
const express=require("express")
const app=express()
const http=require("http")
const sockets=require("socket.io")

const server = http.createServer(app)
const io=sockets(server)
const sbmtions=require("./db/models").assignments
const submissions=require("./db/models").submissions


app.use(express.json())
app.use(express.urlencoded({extended: true}))

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
app.get("/show_ass_from_db",(r,s)=>{
    sbmtions.findAll( {attributes: ['name']} ).then(function(result) {
            let names = result.map(function(item) {
                return item.name
            })
            console.log(names)
        s.send(names)
    })
})
app.post("/add_ass_into_db",(r,s)=>{
    r.body.name=r.body.name.replace(/\s/g,'')
    sbmtions.create({
        name: r.body.name
    }).then(()=>{
        sbmtions.findAll( {attributes: ['name']} ).then(function(result) {
            let names = result.map(function(item) {
                return item.name
            })
            console.log(names)
        })
        s.redirect("/t_assignment")
    })

})
app.post("/s/newsub",(r,s)=>{
    submissions.create({
        ass_name: r.body.ass_name,
        name: r.body.name,
        url: r.body.url
    }).then(()=>{
        s.redirect("/s_assignment")
    })
})

app.get("/s/:name",(r,s)=>{
    submissions.findAll({
        where: {"ass_name": r.params.name}
    }).then(function(sub_info){
        s.send(sub_info)
    })
})

server.listen(8888,()=>{console.log("UP @ 8888")})