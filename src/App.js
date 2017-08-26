import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import firebase, { auth, provider } from 'firebase';
import Login from './components/Login/Login';
import NewPost from './components/NewPost/NewPost';
import Quotes from './components/Quotes/Quotes';
import Register from './components/Register/Register';
import BottomNav from './components/BottomNav/BottomNav';
import Header from './components/Header/Header';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      quotes: null,
      quoteEdition: {}
    };
  }

  componentDidMount() {
    const auth = new firebase.auth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        var quotesRef = firebase.database().ref('users/' + user.uid);
        let quotesData;
        quotesRef.on('value', function (snapshot) {
          quotesData = snapshot.val();
        });
        this.setState({
          user
        });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header user={this.state.user} />
            <div className="container">
              <Route exact path="/" component={
                () => (
                  !this.state.user 
                    ?
                    <Login user={this.state.user} /> 
                    :
                    <Quotes user={this.state.user} />
                )
              } />
              <Route exact path="/quote" component={() => (<NewPost user={this.state.user} />)} />
              <Route exact path="/quotes" component={() => (<Quotes user={this.state.user} />)} />
              <Route exact path="/register" component={() => (<Register />)} />

              {this.state.user && <BottomNav />}
            </div>

          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
