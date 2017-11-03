import React, { Component } from 'react';
import firebase from 'firebase';
import Router from '../Router/Router';
import Login from '../Login/Login';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      quotes: null,
      activePage: 0
    };
  }

  componentDidMount() {
    const auth = new firebase.auth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        const quotesRef = firebase.database().ref(`users/${user.uid}/quotes`);
        quotesRef.on('value', (snapshot) => {
          this.setState({
            quotes: snapshot.val()
          })
        });
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }


  submitQuote = (isEdition, quoteId, quote) => {
    let quoteRef = firebase.database().ref(`users/${this.state.user.uid}/quotes/${isEdition ? quoteId : ''}`);
    isEdition ? this.updateQuote(quoteRef, quote) : this.pushQuote(quoteRef, quote);
  }

  updateQuote = (quoteRef, quote) => quoteRef
    .update({
      ...quote
    }).then(() => {
      console.log('updated q')
      this.setState({
        edited: true
      })
    }).catch((error) => console.log(error));

  pushQuote = (quoteRef, quote) => quoteRef
    .push({
      ...quote
    }).then(() => {
      console.log('added q')
    }).catch((error) => console.log(error));

  render() {
    const ifLoggedIn = () => this.state.user;
    return (
      <div>
        {
          !ifLoggedIn() ?
          <Login /> :
          <Router
            {...this.state}
            submitQuote={this.submitQuote}
          />
        }
      </div>
    );
  }
}

export default App;
