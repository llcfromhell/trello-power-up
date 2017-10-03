/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();
var Promise = TrelloPowerUp.Promise;

var btnGetToken = document.getElementById('authorize');

btnGetToken.addEventListener('click', function () {

  getToken().then(function(token) {
    
    return t.storeSecret('token', token.access_token);
    
  }).then(function(){
    
    t.closePopup();
    
  })

});
