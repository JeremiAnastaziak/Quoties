import React, { Component } from 'react';
import firebase from 'firebase';
import Router from '../Router/Router';
import Login from '../Login/Login';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import uuid from 'uuid/v1';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quotes: null,
            activePage: 0
        };
    }

    componentDidUpdate() {
        window.localStorage.setItem('quoties', JSON.stringify(this.state));
    }

    componentDidMount() {
        const auth = new firebase.auth();
        auth.onAuthStateChanged(user => {
            if (user) {
                const quotesRef = firebase
                    .database()
                    .ref(`users/${user.uid}/quotes`);
                quotesRef.on('value', snapshot => {
                    this.setState({
                        quotes: snapshot.val()
                    });
                });
                this.setState({ user });
            } else {
                this.setState({ user: null });
            }
        });

        document.addEventListener('backbutton', function() {
            alert('back button');
        })
    }

    submitQuote = (quoteId, quote) => {
        let quoteRef = firebase
            .database()
            .ref(
                `users/${this.state.user.uid}/quotes/${quoteId || uuid()}`
            );
        quoteRef
            .set({
                ...quote
            })
            .then(() => {
                console.log('q updated');
            })
            .catch(error => console.log(error));
    };

    toggleStarred = quoteId => {
        const qRef = firebase
            .database()
            .ref(`/users/${this.state.user.uid}/quotes/${quoteId}`);
        qRef.update({ starred: !this.state.quotes[quoteId].starred });
    };

    deleteQuote = quoteId => {
        const qRef = firebase
            .database()
            .ref(`/users/${this.state.user.uid}/quotes/${quoteId}`);
        qRef
            .remove()
            .then(() => {
                console.log('Q deleted');
            })
            .catch(error => {
                console.error(error);
            });
    };

    render() {
        const ifLoggedIn = () => this.state.user;
        const ifUserStateChecked = () => this.state.hasOwnProperty('user');
        return (
            <div>
                {!ifUserStateChecked() && <LoadingScreen />}
                {!ifLoggedIn() && ifUserStateChecked() ? (
                    <Login />
                ) : (
                    <Router
                        quotes={this.state.quotes}
                        submitQuote={this.submitQuote}
                        toggleStarred={this.toggleStarred}
                        deleteQuote={this.deleteQuote}
                    />
                )}
            </div>
        );
    }
}

export default App;
