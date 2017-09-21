  $(function(){

    var credentials = {
        grant_type : "client_credentials",
        client_id : "Q45hYpz2UU6UTiPRp425b3HyehyK3eaq",
        client_secret : "3m9w9gpTRTp5i5YBTwxj1OHsrmoOzTlL78PxXxhficfiKPZZSiCu6cwiUfBh4hsO",
        audience : "https://app.rdstation.com.br/api/v2/"
      }

    // $.post("https://rdstation.auth0.com/oauth/token", credentials, function( data ) {
    //     console.log(data)
    // });
    
    var formBody = [];
    for (var property in credentials) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(credentials[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    $.post("https://rdstation.auth0.com/oauth/token", formBody, function( data ) {
        console.log(data)
    },
    "application/x-www-form-urlencoded");

  })