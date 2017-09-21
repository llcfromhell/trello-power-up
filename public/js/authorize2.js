/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();
var Promise = TrelloPowerUp.Promise;


var btnGetToken = document.getElementById('getToken');

btnGetToken.addEventListener('click', function() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "https://rdstation.auth0.com/oauth/token", true); 
  xhttp.setRequestHeader("Content-type", "multipart/form-data");
  
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };
  
  var formData = new FormData();
  
  formData.append("grant_type", "client_credentials");
  formData.append("client_id", "Q45hYpz2UU6UTiPRp425b3HyehyK3eaq");
  formData.append("client_secret", "3m9w9gpTRTp5i5YBTwxj1OHsrmoOzTlL78PxXxhficfiKPZZSiCu6cwiUfBh4hsO");
  formData.append("audience", "https://app.rdstation.com.br/api/v2/");
      
  xhttp.send(formData);

})


// var oauthUrl = 'https://rdstation.auth0.com/oauth/token';

//   var tokenLooksValid = function(token) {
//     return /^[0-9a-f]{64}$/.test(token);
//   }

//   var authorizeOpts = {
//     height: 680,
//     width: 580,
//     validToken: tokenLooksValid
//   };

// var btn = document.getElementById('authorize');

// btn.addEventListener('click', function(){
  
//   t.authorize(oauthUrl, authorizeOpts)
//   .then(function(token) {
//     return t.set('organization', 'private', 'token', token)
//     .catch(t.NotHandled, function() {
//       // fall back to storing at board level
//       return t.set('board', 'private', 'token', token);
//     });
//   })
//   .then(function() {
//     // now that the token is stored, we can close this popup
//     // you might alternatively choose to open a new popup
//     return t.closePopup();
//   });
  
// })