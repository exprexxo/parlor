
firebase.initializeApp({
  apiKey: "AIzaSyDKYuuAgJIcoIM8vBmY-1kf5wwgFw6Kng4",
  authDomain: "xikawa1111.firebaseapp.com",
  projectId: "xikawa1111"
});
var nickname = "";
class Table extends React.Component<State> {
  constructor(props) {
    super(props);
    this.keyPress = this.keyPress.bind(this);
  }
  home = this;
  state = { cards: "", isLoggedIn: "" };
  componentDidMount() {
    var self = this; //this is the magic: this is relative and we needed to preserve it in self
    var db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true }); //  remove old stuff
    var thetable = [
      <tr>
        <th> Active Tables</th>
        <th> Players</th>
      </tr>
    ];
    db
      .collection("tables")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var parts = [];
          parts.push(
            <td>
              <button onClick={self.join.bind(self, doc.id)}> Join</button>
              {` ${doc.id.slice(0, -5)}'s ${doc.id.slice(-5)} of ${
                doc.data().rules
              } `}
            </td>
          );
          parts.push(<td>{` ${doc.data().players} `} </td>);

          thetable.push(<tr>{parts}</tr>);
          self.setState({ cards: thetable });
        });
      });
  }

  create() {
    window.location.replace(
      "https://us-central1-xikawa1111.cloudfunctions.net/parlor?nickname="+nickname+"&gamerules=draw" );
    return false;
  }
  join(tid) {  console.log(tid);
    window.location.replace(
      "https://us-central1-xikawa1111.cloudfunctions.net/jointable?nickname="+nickname+"&tableid="+tid);
    return false;
  }
  keyPress(e) {
    if (e.keyCode == 13) {
      nickname = e.target.value;
      this.setState({ isLoggedIn: nickname });
    }
  }

  render() {
    return (
      <div>
        {this.state.isLoggedIn ? (
          <div>
            <h3>
              {" "}
              Hello {nickname}, either{" "}
              <button onClick={this.create}> create a table</button> or join a
              table below{" "}
            </h3>
            <table>{this.state.cards} </table>
          </div>
        ) : (
          <div>
            <h1>Welcome to the Parlor</h1>
            <h3>
              {" "}
              Enter a nickname to play as &nbsp;
              <input
                value={this.state.value}
                onKeyDown={this.keyPress}
                onChange={this.handleChange}
              />
            </h3>
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<Table />, document.getElementById("root"));
