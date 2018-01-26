let socket=io.connect("http://localhost:8888")
let quesfield = $("#quesfield")


socket.on("question",function(data){
    quesfield.empty()
    quesfield.append(`
<p>${data.question}</p>
<form>
<input type="radio" name="answer" class="answer" value="a"><span>${data.a}</span>
<input type="radio" name="answer" class="answer" value="b"><span>${data.b}</span>
<input type="radio" name="answer" class="answer" value="c"><span>${data.c}</span>
<input type="radio" name="answer" class="answer" value="d"><span>${data.d}</span>
<input type="button" id="submitanswer" value="submit" onclick="window.sbt()">
</form>`)
})
window.sbt=function(){
    if($("input[name='answer']:checked").val() === undefined){
        console.log("cannot submit! Select option")
    }
    else{
    socket.emit('answer', {
        "answer": $("input[name='answer']:checked").val()
    })
    console.log()
    quesfield.empty()
}}


