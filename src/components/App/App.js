import React, { Component } from 'react';
import firebase from 'firebase';
import Router from '../Router/Router';
import Login from '../Login/Login';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import uuid from 'uuid/v1';
import './App.css';

const extractAuthors = (quotes) =>
    Object.values(quotes || {})
        .reduce((curr, next) =>
            curr.includes(next.quoteAuthor) ? curr : curr.concat(next.quoteAuthor), []);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quotes: null,
            authors: [],
            activePage: 0,
            checkingActiveSession: true,
        };
    }

    componentDidMount() {
        this.getQuotesFromLocalStorage();

        new firebase.auth()
            .onAuthStateChanged(user => {
                this.setState({
                    checkingActiveSession: false,
                    user,
                    ref: `users/${(user && user.uid) || null}/quotes/`,
                })

                if (user) {
                    firebase
                        .database()
                        .ref(this.state.ref)
                        .on('value', snapshot => {
                            const quotes = snapshot.val();
                            this.setState({
                                authors: extractAuthors(quotes),
                                quotes
                            })
                        })
                }
            });
    }

    componentDidUpdate() {
        window.localStorage.setItem('quoties', JSON.stringify(this.state));
    }

    getQuotesFromLocalStorage() {
        const storageDate = window.localStorage.getItem('quoties');
        if (storageDate && !this.state.user) {
            const { quotes } = JSON.parse(storageDate);
            this.setState({
                quotes
            })
        }
    }

    submitQuote = (quoteId, quote) => {
        // const handleQuoteSubmit = () =>
        //     this.setState({
        //         ...this.state,
        //         notifications: [{text: 'Q updated', show: true}]
        //         setTimeout(() => {
        //             this.setState({
        //             ...this.state,
        //             notifications: [{text: 'Quote updated', show: false}]
        //         })}, 400000)
        //     });

        firebase
            .database()
            .ref(this.state.ref.concat(quoteId || uuid()))
            .set({ ...quote })
            // .then(handleQuoteSubmit)
            .catch(console.error);
    };

    deleteQuote = quoteId => {
        firebase
            .database()
            .ref(this.state.ref.concat(quoteId))
            .remove()
            .catch(console.error);
    };

    render() {
        return (
            <div>
                {this.state.checkingActiveSession ?
                    <LoadingScreen /> :
                    !this.state.user ?
                        <Login /> :
                        <Router
                            notifications={this.state.notifications}
                            quotes={this.state.quotes}
                            authors={this.state.authors}
                            submitQuote={this.submitQuote}
                            deleteQuote={this.deleteQuote}
                        />
                }
            </div>
        );
    }
}

export default App;
