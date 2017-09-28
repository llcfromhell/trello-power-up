/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

console.log('oi');

// you can access arguments passed to your iframe like so
// unlike logic that lives inside t.render() this will only
// be passed once, so don't rely on this for information that
// could change, for example what attachments you want to show
// in this section
var contact = t.arg('contact');

t.render(function(){
  // make sure your rendering logic lives here, since we will
  // recall this method as the user adds and removes attachments
  // from your section
  t.card('attachments')
  .get('attachments')
  .filter(function(attachment){
    return attachment.url.indexOf('https://www.rdstation.com.br/api/v2/contacts/'+contact.uuid) == 0;
  })
  .then(function(rdAttachments){
    var urls = rdAttachments.map(function(a){ return a.url; });

    document.getElementById('name').textContent = contact.name;

    document.getElementById('urls').textContent = urls.join(', ');
  })
  .then(function(){
    return t.sizeTo('#content');
  });
});
