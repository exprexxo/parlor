const admin = require('firebase-admin');
// You need this library in order to use firebase in functions
const functions = require('firebase-functions');

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.parlor = async (req, res) => {

  // Check if firebase is already initialized, per: https://maxrohde.com/2016/09/21/test-if-firebase-is-initialized-on-node-js-lambda/
  if (admin.apps.length === 0) {
    admin.initializeApp(functions.config().firebase);
  }

  var db = admin.firestore();
  var message = '';
  var users = await getUsers(db);
  var nextPage=createUsers(db,req);
 // message = await getUsers(db);

  res.status(200).send( nextPage);
};

// Write data in a function so you can wait for all the Promises to complete and return per: https://github.com/firebase/functions-samples/issues/78
function createUsers(db,req,users) {
  var action= req.query.action ;
  var nickname= req.query.nickname ;
  var gamerules= req.query.gamerules;
  var tableid = req.query.tableid;
 if(action == "table"){
  var docRef = db.collection('tables').doc(nickname+'table');
  var suites = ["C","D","S","H"];
  var values = ["2","3","4","5","6","7","8","9","T","J","Q","K","A"];
  var deckarray=[];  //build the deck
    for (var i=0;i<4;i++){
    for (var j =0;j<13;j++){
      deckarray.push(suites[i] + values[j] + "0");
    }
  }
     var c1 = 0;
     var c2 = 0;
     var t="";
     for (var j =0;j<100;j++){// shuffle the deck
      c1 =  Math.round(51*Math.random());
      c2 =  Math.round(51*Math.random());
      t= deckarray[c1];
       deckarray[c1]=deckarray[c2];
       deckarray[c2]=t;
    }
  var deck="";
  for (var k=0;k<52;k++){  //stringafy the deck
      deck = deck + deckarray[k];
  }
  var setAda = docRef.set({
    players: nickname,
    rules: gamerules,
    deck: deck
  })
  .catch((err) => {
    console.log('Error writing document', err);
  });
   var message = 'Table formed Current Players are : '+players+'<br/>Invite others : </br><a href="https://codepen.io/exprexxo/full/pLWevM/">Start the game with current players</a>';


  }else if( action=='join'){
    var curPlayers="";
    var docRef = db.collection('tables').doc(tableid);
    docRef.get().then(function(doc) {
       if (doc.exists) {
            curPlayers = doc.data().players);
       } else {
        // doc.data() will be undefined in this case
        console.log("No such table!");
        }
    }).catch(function(error) {
    console.log("Error getting table:", error);
    });


    var setAda = docRef.set({
    players: curPlayers+nickname,

  });
     var message = 'Joined Table Current Players are : '+ curPlayers+nickname+'<br/>Invite others : </br><a href="https://codepen.io/exprexxo/full/pLWevM/">Sit down at table </a>';

  }else if( action=='watch'){
    //  nothing yet

  }
  Promise.all([setAda])  //wait for update to complete
  return  message;
}

async function getUsers(db) {
  var message = '';
 /* var game= db.collection('tables').doc(gamerules).get()
   // .then((snapshot) => {
   //   snapshot.forEach((doc) => {
        // You need to stringify doc.data() if you want to render it outside of a console.log()
       // message += '\n' + doc.id + '=>' + JSON.stringify(doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
*/
    return message;
}
