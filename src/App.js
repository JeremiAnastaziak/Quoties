import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import firebase from 'firebase';
import Login from './components/Login/Login';
import NewPost from './components/NewPost/NewPost';
import Feed from './components/Feed/Feed';
import Authors from './components/Authors/Authors';
import Starred from './components/Starred/Starred';
import Search from './components/Search/Search';
import Register from './components/Register/Register';
import BottomNav from './components/BottomNav/BottomNav';
import Header from './components/Header/Header';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      quotes: null
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
        this.setState({
          user
        });
      } else {
        this.setState({ user: null });
      }
    });
  }

  editQuote = (quoteId) => {
    console.log(quoteId)
    const state = this.state
    this.setState({
      ...state,
      edition: { id: quoteId, quote: { ...this.state.quotes[quoteId] } }
    })
    return (<Redirect push to="/quote" />)
  }

  updateQuote = (quoteId, quote) => {
    if (quoteId) {
      const quotesRef = firebase.database().ref(`users/${this.state.user.uid}/quotes/${quoteId}`);
      quotesRef.update({ ...quote }).then(() => {
        console.log('updated');
        this.setState({
          edition: null
        })
      }).catch((err) => {
        console.error(err)
      });
    } else {
      this.setState({
        edition: null
      })
    }
  }

  render() {
    const feedComponent = <Feed user={this.state.user} quotes={this.state.quotes} editQuote={this.editQuote} />
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header user={this.state.user} />
            <div className="container">
              <Route
                exact
                path="/"
                component={() => (
                  !this.state.user ?
                    <Login user={this.state.user} />
                    : this.state.edition ?
                      <Redirect push to="/quote" />
                      : feedComponent
                )
                } />
              <Route
                exact
                path="/quote"
                component={() =>
                  <NewPost
                    updateQuote={this.updateQuote}
                    user={this.state.user}
                    edition={this.state.edition} />} />
              <Route
                exact
                path="/authors"
                component={() => this.state.edition ?
                  <Redirect push to="/quote" />
                  : <Authors
                    quotes={this.state.quotes}
                    user={this.state.user}
                    editQuote={this.editQuote} />} />
              <Route
                exact
                path="/search"
                component={() => <Search 
                  quotes={this.state.quotes}
                  user={this.state.user}
                  editQuote={this.editQuote}/>} />
              <Route
                exact
                path="/starred"
                component={() => this.state.edition ?
                  <Redirect push to="/quote" />
                  : <Starred
                    quotes={this.state.quotes}
                    user={this.state.user}
                    editQuote={this.editQuote} />} />
              <Route
                exact
                path="/register"
                component={() => <Register />} />

              {this.state.user && <BottomNav />}
            </div>

          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
