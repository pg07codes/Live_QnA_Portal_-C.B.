let socket=io.connect("http://localhost:8888")

let question=$("#question")
let a=$("#a")
let b=$("#b")
let c=$("#c")
let d=$("#d")
let submit =$("#submit")
let results=$("#results")
let graph=$("#graph")

function validate(){
        let x = document.forms["liveques"]["ques"].value
        let y=document.forms["liveques"]["optA"].value
        let z=document.forms["liveques"]["optB"].value
        if (x == "") {
            alert("Question must be filled out")
            return false
        }
        else if(y==""||z==""){
            alert("Atleast two options should be filled")
        }
        else
            return true
}
submit.click(function(){
    if(validate()){
        socket.emit('question', {
            "question": question.val(),
            "a":a.val(),
            "b":b.val(),
            "c":c.val(),
            "d":d.val()
        })
    }

})



function cb(x,y,z,o){
    graph.empty()
    graph.append(`<span>${x}%</span>
<span>${y}%</span>
<span>${z}%</span>
<span>${o}%</span>`)
}


results.click(function (){
    $.get("http://localhost:8888/results",function (data){
        //not working when console.log(data) is done here ...WHY????
        (function(res,cbx){
            let total=res.length
            let a=((res.filter(opt=> opt==="a")).length)/total*100
            let b=((res.filter(opt=> opt==="b")).length)/total*100
            let c=((res.filter(opt=> opt==="c")).length)/total*100
            let d=((res.filter(opt=> opt==="d")).length)/total*100
            cbx(a,b,c,d)
        })(data,cb)
    })
})