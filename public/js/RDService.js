var getContactData = function(token, uuid) {
  
    return new Promise(function (resolve, reject) {
      
        var contactsUrl = "https://www.rdstation.com.br/api/v2/contacts/";
      
        var xhr = new XMLHttpRequest;
        xhr.addEventListener("error", reject);
        xhr.addEventListener("load", resolve);
        xhr.open("GET", contactsUrl + uuid);

        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + token);

        xhr.onreadystatechange = function () {

          if (this.readyState == 4 && this.status == 200) {

            try {

              var contact = JSON.parse(xhr.responseText);

              if (contact) {
                resolve(contact);
              } else {
                reject('No data returned.')
              }

            } catch (err) {

              console.error(err.message + " in " + xhr.responseText);
              reject(err);

            }
            
          } else if (this.readyState == 4 && this.status == 401) {
            
            reject(401);
                     
          } else if (this.readyState == 4 && this.status == 404) {
            
            reject(404);
                     
          }
            
        }

        xhr.send();
      
    });
}

var getFieldsData = function(token, uuid) {
  
    return new Promise(function (resolve, reject) {
      
        var contactsUrl = "https://www.rdstation.com.br/api/v2/contacts/";
      
        var xhr = new XMLHttpRequest;
        xhr.addEventListener("error", reject);
        xhr.addEventListener("load", resolve);
        xhr.open("GET", contactsUrl + uuid);

        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + token);

        xhr.onreadystatechange = function () {

          if (this.readyState == 4 && this.status == 200) {

            try {

              var contact = JSON.parse(xhr.responseText);

              if (contact) {

                resolve(contact);

              }

            } catch (err) {

              console.error(err.message + " in " + xhr.responseText);
              reject(err);

            }
          }
        }

        xhr.send();
      
    });
}

var getToken = function() {
  
  return new Promise(function (resolve, reject) {
      
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
            resolve(data)
          }
        } catch (err) {
          console.error(err.message + " in " + xhttp.responseText);
          reject(err);
        }
      }
    };

    xhttp.send(JSON.stringify(credentials));
      
  });
}