/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();
var Promise = TrelloPowerUp.Promise;

var btnGetToken = document.getElementById('getToken');

btnGetToken.addEventListener('click', function () {

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/auth/token", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  var credentials = {
    "grant_type": "client_credentials",
    "client_id": "Q45hYpz2UU6UTiPRp425b3HyehyK3eaq",
    "client_secret": "3m9w9gpTRTp5i5YBTwxj1OHsrmoOzTlL78PxXxhficfiKPZZSiCu6cwiUfBh4hsO",
    "audience": "https://app.rdstation.com.br/api/v2/"
  }

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      try {
        var data = JSON.parse(xhttp.responseText);
        if (data.access_token) {
          t.storeSecret('token', data.access_token);
        }
      } catch (err) {
        console.error(err.message + " in " + xmlhttp.responseText);
        return;
      }
    }
  };

  xhttp.send(JSON.stringify(credentials));

});
