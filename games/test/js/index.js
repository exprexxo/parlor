var hands = [
["ad-1"],
["d3", "c5", "h1", "c5", "h4"],
["ad-2"],
["h2", "c5", "h3"],
["decks"],
["h7"],
["ad-3"],
["d3", "c5", "h8"],
["ad-4"]];


firebase.initializeApp({
  apiKey: 'AIzaSyDKYuuAgJIcoIM8vBmY-1kf5wwgFw6Kng4',
  authDomain: 'xikawa1111.firebaseapp.com',
  projectId: 'xikawa1111' });


// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true });



site = "https://google.com";
var listHands = hands.map(function (hhands, i) {return (
    React.createElement("li", null,
      React.createElement("div", { id: "hand" + i },
        hhands.map(function (hcards, ii) {return React.createElement("a", { href: site }, hcards);}))));});



play();

function play() {
  db.
  collection("tables").
  doc("dddddtable").
  onSnapshot(function (doc) {
    console.log("Current data: ", doc.data());
    var cow = doc.data().deck; //doc.data()
    var cat = doc.data().players; //doc.data()
    ReactDOM.render(
    React.createElement("div", { id: "players" },
      React.createElement("div", { id: "handwrapper" },
        React.createElement("ul", null, cow),
        React.createElement("ul", null, cat))),


    document.getElementById("root"));





  });
}

ReactDOM.render(
React.createElement("div", { id: "table" },
  React.createElement("div", { id: "handwrapper" },
    React.createElement("ul", null, listHands))),


document.getElementById("root"));