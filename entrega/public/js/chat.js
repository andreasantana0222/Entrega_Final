let socket = io.connect();
socket.on('message', function(data){  
  render(data);
});

function render(data){
  var html=data.map(function(elem,index){
    return(`<div>
      <strong>${elem.author}<span style="color:blue">
        <em>${elem.email}</em></span></strong>
        <span style="color:brown"><em>${elem.datetime}</em></span>
      <span style="color:green"><i><em>${elem.text}</em></i></span> 
      <span style="color:red"><i><em>${elem.type}</em></i></span> 
      </div>`)
  }).join(" ");
  document.getElementById('messages').innerHTML=html;
}
socket.on('messages',function(data){ render(data); });





function addMessage(e){
  var miValor="usuario";

  //TO DO valor undefined
  var inputs = document.getElementsByName("tipo");

    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].checked) {
        miValor= (inputs[i].value!="")?inputs[i].value:"usuario";
      }
    }
    

    var mensaje={
      author: document.getElementById('username').value,
      email: document.getElementById('email').value,
      text: document.getElementById('texto').value,
      datetime: (new Date(Date.now())).toLocaleString(),
      valor: document.getElementById('usuario').value
    };
    

    socket.emit('new-message',mensaje);
    return false;
}
