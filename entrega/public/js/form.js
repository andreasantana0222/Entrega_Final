function sendData() {

 
  const inputEmail = document.querySelector('#email');
  const inputPassword = document.querySelector('#password');
  const email = inputEmail.value.trim();
  const pass = inputPassword.value.trim();

    
    var url = "/api/usuarios/loginHtml";
    

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
          console.log(xhr.status);
          console.log(xhr.responseText);
      }};
    let data = {
      "email": email,
      "password": pass
    };

    
    // And finally, send our data.
    xhr.send( JSON.stringify(data) );
  
 } ;

 



