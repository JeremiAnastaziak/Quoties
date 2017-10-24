import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import firebase from 'firebase';
import Login from './components/Login/Login';
import NewPost from './components/NewPost/NewPost';
import Feed from './components/Feed/Feed';
import Authors from './components/Authors/Authors';
import Starred from './components/Starred/Starred';
import Search from './components/Search/Search';
import BottomNav from './components/BottomNav/BottomNav';
import Header from './components/Header/Header';
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
    return (
      <div className="mobile-first">
        <HashRouter>
          <div>
            {this.state.user && <Header user={this.state.user} />}
            <div className={this.state.user ? "container" : ''}>
              <Route
                exact
                path="/"
                component={() => (
                  !this.state.user ?
                    <Login user={this.state.user} />
                    : <Feed
                      user={this.state.user}
                      quotes={this.state.quotes}
                    />
                )
                } />
              <Route
                exact
                path="/quote"
                component={(routerParams) =>
                  <NewPost
                    quotes={this.state.quotes}
                    user={this.state.user}
                    edition={routerParams.location.state}
                    submitQuote={this.submitQuote}
                  />} />
              <Route
                exact
                path="/authors"
                component={() =>
                  <Authors
                    quotes={this.state.quotes}
                    user={this.state.user}
                  />} />
              <Route
                exact
                path="/search"
                component={() =>
                  <Search
                    quotes={this.state.quotes}
                    user={this.state.user} />} />
              <Route
                exact
                path="/starred"
                component={() =>
                  <Starred
                    quotes={this.state.quotes}
                    user={this.state.user}
                  />} />

              {this.state.user && <BottomNav />}
            </div>

          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
