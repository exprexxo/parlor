var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}firebase.initializeApp({
  apiKey: "AIzaSyDKYuuAgJIcoIM8vBmY-1kf5wwgFw6Kng4",
  authDomain: "xikawa1111.firebaseapp.com",
  projectId: "xikawa1111" });

var nickname = "";var
Table = function (_React$Component) {_inherits(Table, _React$Component);
  function Table(props) {_classCallCheck(this, Table);var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this,
    props));_this.


    home = _this;_this.
    state = { cards: "", isLoggedIn: "" };_this.keyPress = _this.keyPress.bind(_this);return _this;}_createClass(Table, [{ key: "componentDidMount", value: function componentDidMount()
    {
      var self = this; //this is the magic: this is relative and we needed to preserve it in self
      var db = firebase.firestore();
      db.settings({ timestampsInSnapshots: true }); //  remove old stuff
      var thetable = [
      React.createElement("tr", null,
        React.createElement("th", null, " Active Tables"),
        React.createElement("th", null, " Players"))];


      db.
      collection("tables").
      get().
      then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var parts = [];
          parts.push(
          React.createElement("td", null,
            React.createElement("button", { onClick: self.join.bind(self, doc.id) }, " Join"), " " +
            doc.id.slice(0, -5) + "'s " + doc.id.slice(-5) + " of " +
            doc.data().rules + " "));



          parts.push(React.createElement("td", null, " " + doc.data().players + " ", " "));

          thetable.push(React.createElement("tr", null, parts));
          self.setState({ cards: thetable });
        });
      });
    } }, { key: "create", value: function create()

    {
      window.location.replace(
      "https://us-central1-xikawa1111.cloudfunctions.net/parlor?nickname=" + nickname + "&gamerules=draw");
      return false;
    } }, { key: "join", value: function join(
    tid) {console.log(tid);
      window.location.replace(
      "https://us-central1-xikawa1111.cloudfunctions.net/jointable?nickname=" + nickname + "&tableid=" + tid);
      return false;
    } }, { key: "keyPress", value: function keyPress(
    e) {
      if (e.keyCode == 13) {
        nickname = e.target.value;
        this.setState({ isLoggedIn: nickname });
      }
    } }, { key: "render", value: function render()

    {
      return (
        React.createElement("div", null,
          this.state.isLoggedIn ?
          React.createElement("div", null,
            React.createElement("h3", null,
              " ", "Hello ",
              nickname, ", either", " ",
              React.createElement("button", { onClick: this.create }, " create a table"), " or join a table below",
              " "),

            React.createElement("table", null, this.state.cards, " ")) :


          React.createElement("div", null,
            React.createElement("h1", null, "Welcome to the Parlor"),
            React.createElement("h3", null,
              " ", "Enter a nickname to play as \xA0",

              React.createElement("input", {
                value: this.state.value,
                onKeyDown: this.keyPress,
                onChange: this.handleChange })))));






    } }]);return Table;}(React.Component);


ReactDOM.render(React.createElement(Table, null), document.getElementById("root"));