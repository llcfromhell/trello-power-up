/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

// you can access arguments passed to your iframe like so
// unlike logic that lives inside t.render() this will only
// be passed once, so don't rely on this for information that
// could change, for example what attachments you want to show
// in this section

t.render(function(){
  // make sure your rendering logic lives here, since we will
  // recall this method as the user adds and removes attachments
  // from your section

  var rdApiUrl = 'https://app.rdstation.com.br/leads/public/';
  var uuid = t.arg('uuid');
  
  t.loadSecret('token').then(function(token) {
  
    getContactData(token, uuid).then(function(contact) {
              
      if (contact) {

        var content = document.getElementById('content');
        
        content.innerHTML = '';
        
        var infoTable = document.createElement('TABLE');

        var headerRow = infoTable.createTHead().insertRow(0);
        var th = document.createElement('th');
        th.innerHTML = contact.name;
        th.colSpan = 2;
        headerRow.append(th);

        var tbody = document.createElement('tbody');

        var tagsRow = tbody.insertRow(0);
        tagsRow.insertCell(0).innerHTML = "Tags";
        tagsRow.insertCell(1).innerHTML = contact.tags.reduce(function(prev,curr){return prev + ", " + curr});

        if (contact.email) {
          var emailRow = tbody.insertRow(0);
          emailRow.insertCell(0).innerHTML = "Email";
          emailRow.insertCell(1).innerHTML = contact.email;
        }

        if (contact.personal_phone) {
          var phoneRow = tbody.insertRow(0);
          phoneRow.insertCell(0).innerHTML = "Tel. Fixo";
          phoneRow.insertCell(1).innerHTML = contact.personal_phone;
        }
        
        if (contact.mobile_phone) {
          var mobileRow = tbody.insertRow(0);
          mobileRow.insertCell(0).innerHTML = "Tel. Celular";
          mobileRow.insertCell(1).innerHTML = contact.mobile_phone;
        }

        var jobRow = tbody.insertRow(0);
        jobRow.insertCell(0).innerHTML = "Cargo";
        jobRow.insertCell(1).innerHTML = contact.job_title;

        var cityRow = tbody.insertRow(0);
        cityRow.insertCell(0).innerHTML = "Cidade";
        cityRow.insertCell(1).innerHTML = contact.city;

        var facebookRow = tbody.insertRow(0);
        facebookRow.insertCell(0).innerHTML = "Facebook";
        var linkFb = document.createElement('A');
        linkFb.setAttribute('href', 'https://www.facebook.com/'+contact.facebook);
        linkFb.appendChild(document.createTextNode(contact.facebook));
        facebookRow.insertCell(1).appendChild(linkFb);

        var twitterRow = tbody.insertRow(0);
        twitterRow.insertCell(0).innerHTML = "Twitter";
        twitterRow.insertCell(1).innerHTML = contact.twitter;

        var linkedinRow = tbody.insertRow(0);
        linkedinRow.insertCell(0).innerHTML = "Linkedin";
        linkedinRow.insertCell(1).innerHTML = contact.linkedin;
        
        if (contact.website) {
          var websiteRow = tbody.insertRow(0);
          websiteRow.insertCell(0).innerHTML = "Website";
          websiteRow.insertCell(1).innerHTML = contact.website;
        }

        infoTable.append(tbody);
        
        content.appendChild(infoTable);

      }
    
    //
    // when getContactData fails
    //
    }, function(errorCode) {

      console.log(errorCode)

    //
    // at least
    //
    }).then(function() {

      t.card('attachments').get('attachments')

      .filter(function(attachment) {      
        return attachment.url.indexOf(rdApiUrl + uuid) == 0;
      })

      .then(function(rdAttachments) {
        
        var url = rdAttachments[0].url;
        
        document.getElementById('url').textContent = url;

      })

      .then(function(){
        
        document.getElementById('loader').style.display = 'none';

        return t.sizeTo('#content');

      });
      
    });
    
  })
  
});