/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

console.log('oi');

// you can access arguments passed to your iframe like so
// unlike logic that lives inside t.render() this will only
// be passed once, so don't rely on this for information that
// could change, for example what attachments you want to show
// in this section
var uuid = t.arg('uid');

t.render(function(){
  // make sure your rendering logic lives here, since we will
  // recall this method as the user adds and removes attachments
  // from your section

  // t.loadSecret('token').then(function(token) {
    
  //             var contacts = [];
    
  //             claimed.forEach(function(element) {
    
  //               var uuid = element.url.split('/').pop();
                  
  //               var xhttp = new XMLHttpRequest();
  //               xhttp.open("GET", "https://www.rdstation.com.br/api/v2/contacts/" + uuid, true);
                
  //               xhttp.setRequestHeader("Content-type", "application/json");
  //               xhttp.setRequestHeader("Authorization", "Bearer " + token);
        
  //               xhttp.onreadystatechange = function () {
                  
  //                 if (this.readyState == 4 && this.status == 200) {
                      
  //                   try {
    
  //                     var contact = JSON.parse(xhttp.responseText);
                      
  //                     if (contact) {
                        
  //                       contacts.push({
  //                         id: contact.uuid, // optional if you aren't using a function for the title
  //                         claimed: claimed,
  //                         icon: HYPERDEV_ICON,
  //                         title: contact.name,
  //                         content: {
  //                           type: 'iframe',
  //                           url: t.signUrl('./section.html', { 'contact': contact }),
  //                           height: 230
  //                         }
  //                       });
    
  //                       console.log(contact);
    
  //                     }
    
  //                   } catch (err) {
                        
  //                     console.error(err.message + " in " + xmlhttp.responseText);
  //                     return;
    
  //                   }
  //                 }
  //               }
    
  //               xhttp.send();
    
  //             });  
    
  //             console.group('requesting');
  //             console.log(contacts);
  //             console.groupEnd();
  //             return contacts;
    
  //           }).then(function(contacts){
    
  //             console.group('resolving');
  //             console.log(contacts);
  //             console.groupEnd();
              
  //             resolve(contacts);
    
  //           });


  t.card('attachments')
  .get('attachments')
  .filter(function(attachment){
    return attachment.url.indexOf('https://www.rdstation.com.br/api/v2/contacts/'.uuid) == 0;
  })
  .then(function(rdAttachments){
    var urls = rdAttachments.map(function(a){ return a.url; });

    document.getElementById('name').textContent = uuid;

    document.getElementById('urls').textContent = urls.join(', ');
  })
  .then(function(){
    return t.sizeTo('#content');
  });
});
