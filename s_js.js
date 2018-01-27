let socket=io.connect("http://localhost:8888")
let quesfield = $("#quesfield")


socket.on("question",function(data){
    quesfield.empty()
    quesfield.append(`<div class="container spacer">
<div class="card">
  <div class="card-header">
    <span>QUESTION: </span><p style="font-weight: bold;font-family: Bahnschrift; font-size: 20px; margin-left:18px;">${data.question}</p>
  </div>
  <div class="card-body">
    <blockquote class="blockquote mb-0">
        <form>
        <input type="radio" name="answer" class="answer" value="a"><span class="x">${data.a}</span><br>
        <input type="radio" name="answer" class="answer" value="b"><span class="x">${data.b}</span><br>
        <input type="radio" name="answer" class="answer" value="c"><span class="x">${data.c}</span><br>
        <input type="radio" name="answer" class="answer" value="d"><span class="x">${data.d}</span><br>
        <input type="button" class="btn btn-success mt-md-3 btnstyle" id="submitanswer" value="SUBMIT ANSWER" onclick="window.sbt()"><br>
        </form>
     </blockquote>
  </div>
</div>
</div>`)
})
window.sbt=function(){
    if($("input[name='answer']:checked").val() === undefined){
        alert("Select answer first!!")
    }
    else{
    socket.emit('answer', {
        "answer": $("input[name='answer']:checked").val()
    })
    console.log()
    quesfield.empty()
}}


