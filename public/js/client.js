/* global TrelloPowerUp */

// we can access Bluebird Promises as follows
var Promise = TrelloPowerUp.Promise;

/*

Trello Data Access

The following methods show all allowed fields, you only need to include those you want
They all return promises that resolve to an object with the requested fields

Get information about the current board
t.board('id', 'name', 'url', 'shortLink', 'members')

Get information about the current list (only available when a specific list is in context)
So for example available inside 'attachment-sections' or 'card-badges' but not 'show-settings' or 'board-buttons'
t.list('id', 'name', 'cards')

Get information about all open lists on the current board
t.lists('id', 'name', 'cards')

Get information about the current card (only available when a specific card is in context)
So for example available inside 'attachment-sections' or 'card-badges' but not 'show-settings' or 'board-buttons'
t.card('id', 'name', 'desc', 'due', 'closed', 'cover', 'attachments', 'members', 'labels', 'url', 'shortLink', 'idList')

Get information about all open cards on the current board
t.cards('id', 'name', 'desc', 'due', 'closed', 'cover', 'attachments', 'members', 'labels', 'url', 'shortLink', 'idList')

Get information about the current active Trello member
t.member('id', 'fullName', 'username')

*/

/*

Storing/Retrieving Your Own Data

Your Power-Up is afforded 4096 chars of space per scope/visibility
The following methods return Promises.

Storing data follows the format: t.set('scope', 'visibility', 'key', 'value')
With the scopes, you can only store data at the 'card' scope when a card is in scope
So for example in the context of 'card-badges' or 'attachment-sections', but not 'board-badges' or 'show-settings'
Also keep in mind storing at the 'organization' scope will only work if the active user is a member of the team

Information that is private to the current user, such as tokens should be stored using 'private'

t.set('organization', 'private', 'key', 'value');
t.set('board', 'private', 'key', 'value');
t.set('card', 'private', 'key', 'value');

Information that should be available to all users of the Power-Up should be stored as 'shared'

t.set('organization', 'shared', 'key', 'value');
t.set('board', 'shared', 'key', 'value');
t.set('card', 'shared', 'key', 'value');

If you want to set multiple keys at once you can do that like so

t.set('board', 'shared', { key: value, extra: extraValue });

Reading back your data is as simple as

t.get('organization', 'shared', 'key');

Or want all in scope data at once?

t.getAll();

*/

var HYPERDEV_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Fhyperdev.svg';
var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';
var WHITE_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg';

var RD_ICON_12 = 'https://seemly-hill.glitch.me/img/logo-small-12.jpg';
var RD_ICON = 'https://seemly-hill.glitch.me/img/logo-small.jpg';

var randomBadgeColor = function () {
  return ['green', 'yellow', 'red', 'none'][Math.floor(Math.random() * 4)];
};

var getBadges = function (t, options) {
  
  return t.card('attachments').get('attachments')
    
    .then(function(attachments) {
    
        var rdAttachments = attachments.filter(function (attachment) {
          return attachment.url.indexOf('https://app.rdstation.com.br/leads/public/') === 0;
        });
    
        var rdBadge = { };
    
        console.log(rdAttachments)
    
        if (rdAttachments.length) {  
          rdBadge = {
            title: 'RD', // for detail badges only
            text: rdAttachments.length,
            icon: RD_ICON_12, // for card front badges only
            color: null
          };
        }  
          
        return [rdBadge];
        
      })
    
      
    };


var boardButtonCallback = function (t) {
  return t.popup({
    title: 'Popup List Example',
    items: [
      {
        text: 'Open Overlay',
        callback: function (t) {
          return t.overlay({
            url: './overlay.html',
            args: { rand: (Math.random() * 100).toFixed(0) }
          })
            .then(function () {
              return t.closePopup();
            });
        }
      },
      {
        text: 'Open Board Bar',
        callback: function (t) {
          return t.boardBar({
            url: './board-bar.html',
            height: 200
          })
            .then(function () {
              return t.closePopup();
            });
        }
      }
    ]
  });
};

var cardButtonCallback = function (t) {
  // Trello Power-Up Popups are actually pretty powerful
  // Searching is a pretty common use case, so why reinvent the wheel

  var items = ['acad', 'arch', 'badl', 'crla', 'grca', 'yell', 'yose'].map(function (parkCode) {
    var urlForCode = 'http://www.nps.gov/' + parkCode + '/';
    var nameForCode = '🏞 ' + parkCode.toUpperCase();
    return {
      text: nameForCode,
      url: urlForCode,
      callback: function (t) {
        // in this case we want to attach that park to the card as an attachment
        return t.attach({ url: urlForCode, name: nameForCode })
          .then(function () {
            // once that has completed we should tidy up and close the popup
            return t.closePopup();
          });
      }
    };
  });

  // we could provide a standard iframe popup, but in this case we
  // will let Trello do the heavy lifting
  return t.popup({
    title: 'Popup Search Example',
    items: items, // Trello will search client side based on the text property of the items
    search: {
      count: 5, // how many items to display at a time
      placeholder: 'Search National Parks',
      empty: 'No parks found'
    }
  });

  // in the above case we let Trello do the searching client side
  // but what if we don't have all the information up front?
  // no worries, instead of giving Trello an array of `items` you can give it a function instead
  /*
  return t.popup({
    title: 'Popup Async Search',
    items: function(t, options) {
      // use options.search which is the search text entered so far
      // and return a Promise that resolves to an array of items
      // similar to the items you provided in the client side version above
    },
    search: {
      placeholder: 'Start typing your search',
      empty: 'Huh, nothing there',
      searching: 'Scouring the internet...'
    }
  });
  */
};

// We need to call initialize to get all of our capability handles set up and registered with Trello
TrelloPowerUp.initialize({
  
  // NOTE about asynchronous responses
  // If you need to make an asynchronous request or action before you can reply to Trello
  // you can return a Promise (bluebird promises are included at TrelloPowerUp.Promise)
  // The Promise should resolve to the object type that is expected to be returned
  'attachment-sections': function (t, options) {

    // options.entries is a list of the attachments for this card
    // you can look through them and 'claim' any that you want to
    // include in your section.

    // we will just claim urls for Yellowstone
    var claimed = options.entries.filter(function (attachment) {
      return attachment.url.indexOf('https://app.rdstation.com.br/leads/public/') === 0;
    });

    // you can have more than one attachment section on a card
    // you can group items together into one section, have a section
    // per attachment, or anything in between.
    
    var contacts = [];

    if (claimed && claimed.length > 0) {
    // if the title for your section requires a network call or other
    // potentially length operation you can provide a function for the title
    // that returns the section title. If you do so, provide a unique id for
    // your section

      claimed.forEach(function (element) {

        var uuid = element.url.split('/').pop();

        contacts.push({
          
          //id: 'Yellowstone', // optional if you aren't using a function for the title
          claimed: claimed,
          icon: RD_ICON_12,
          title: 'Contato do RD Station',
          content: {
            type: 'iframe',
            url: t.signUrl('./section.html', { uuid: uuid }),
            height: 230
          }

        });
      
      })
      
    }

    return contacts;
    
  },

      'authorization-status': function (t, options) {

        // return a promise that resolves to the object with
        // a property 'authorized' being true/false
        // you can also return the object synchronously if you know the answer synchronously
        // return new TrelloPowerUp.Promise((resolve) => resolve({ authorized: authorized }));
        return new TrelloPowerUp.Promise(function (resolve, reject) {

          t.loadSecret('token').then(function (token) {

            try {
              var authorized = (token);
              resolve({ authorized: authorized });
              
            } catch (err) {
              reject('Error trying to load token from browser db.');
            }

          });

        });

      },

      // 'board-buttons': function(t, options){
      //   return [{
      //     // we can either provide a button that has a callback function
      //     // that callback function should probably open a popup, overlay, or boardBar
      //     icon: WHITE_ICON,
      //     text: 'Popup',
      //     callback: boardButtonCallback
      //   }, {
      //     // or we can also have a button that is just a simple url
      //     // clicking it will open a new tab at the provided url
      //     icon: WHITE_ICON,
      //     text: 'URL',
      //     url: 'https://trello.com/inspiration',
      //     target: 'Inspiring Boards' // optional target for above url
      //   }];
      // },
      'card-badges': function(t, options){       
        return getBadges(t, options);
      },
      // 'card-buttons': function(t, options) {
      //   return [{
      //     // usually you will provide a callback function to be run on button click
      //     // we recommend that you use a popup on click generally
      //     icon: GRAY_ICON, // don't use a colored icon here
      //     text: 'Open Popup',
      //     callback: cardButtonCallback
      //   }, {
      //     // but of course, you could also just kick off to a url if that's your thing
      //     icon: GRAY_ICON,
      //     text: 'Just a URL',
      //     url: 'https://developers.trello.com',
      //     target: 'Trello Developer Site' // optional target for above url
      //   }];
      // },
      // 'card-detail-badges': function(t, options) {
      //   return getBadges(t);
      // },
      'card-from-url': function (t, options) {
        // options.url has the url in question
        // if we know cool things about that url we can give Trello a name and desc
        // to use when creating a card. Trello will also automatically add that url
        // as an attachment to the created card
        // As always you can return a Promise that resolves to the card details

        return new Promise(function (resolve) {
          resolve({
            name: '💻 ' + options.url + ' 🤔',
            desc: 'This Power-Up knows cool things about the attached url'
          });
        });

        // if we don't actually have any valuable information about the url
        // we can let Trello know like so:
        // throw t.NotHandled();
      },
      'format-url': function (t, options) {
        // options.url has the url that we are being asked to format
        // in our response we can include an icon as well as the replacement text

        return {
          icon: GRAY_ICON, // don't use a colored icon here
          text: '👉 ' + options.url + ' 👈'
        };

        // if we don't actually have any valuable information about the url
        // we can let Trello know like so:
        // throw t.NotHandled();
      },
      'show-authorization': function (t, options) {
        // return what to do when a user clicks the 'Authorize Account' link
        // from the Power-Up gear icon which shows when 'authorization-status'
        // returns { authorized: false }
        // in this case we would open a popup

        return t.popup({
          title: 'Autorizar conta',
          url: './authorize.html', // this page doesn't exist in this project but is just a normal page like settings.html
          height: 140,
        });

      },
      'show-settings': function (t, options) {
        // when a user clicks the gear icon by your Power-Up in the Power-Ups menu
        // what should Trello show. We highly recommend the popup in this case as
        // it is the least disruptive, and fits in well with the rest of Trello's UX
        return t.popup({
          title: 'Settings',
          url: './settings.html',
          height: 184 // we can always resize later, but if we know the size in advance, its good to tell Trello
        });
      }
});

console.log('Loaded by: ' + document.referrer);