/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

var btnGetToken = document.getElementById('getToken');

btnGetToken.addEventListener('click', function() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "https://rdstation.auth0.com/oauth/token", true);
  xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  xhttp.setRequestHeader("accept", "application/json");
    
  var credentials = {
    grant_type : "client_credentials",
    client_id : "Q45hYpz2UU6UTiPRp425b3HyehyK3eaq",
    client_secret : "3m9w9gpTRTp5i5YBTwxj1OHsrmoOzTlL78PxXxhficfiKPZZSiCu6cwiUfBh4hsO",
    audience : "https://app.rdstation.com.br/api/v2/"
  }
  
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };

  var formBody = [];
  
  for (var property in credentials) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(credentials[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  
  formBody = formBody.join("&");
  
  console.log(formBody);
  xhttp.send(formBody);

});
