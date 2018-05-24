import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NewPost from '../NewPost/NewPost';
import Quotes from '../Quotes/Quotes';
import Authors from '../Authors/Authors';
import Starred from '../Starred/Starred';
import Search from '../Search/Search';
import BottomNav from '../BottomNav/BottomNav';
import Header from '../Header/Header';
import AuthorQuotes from '../AuthorQuotes/AuthorQuotes';

const extractAuthors = (quotes) => {
    let authors = [];
    quotes &&
        Object.keys(quotes).map(
            index =>
                !authors.includes(quotes[index].quoteAuthor) &&
                authors.push(quotes[index].quoteAuthor)
        );
    return authors;
};

const Router = ({ user, quotes, submitQuote, toggleStarred, deleteQuote }) => {
    const authors = extractAuthors(quotes);
    return (
        <BrowserRouter>
            <div>
                <Header user={user} />
                <div style={{ marginBottom: '55px' }}>
                    <Route
                        exact
                        path="/"
                        component={() => (
                            <Quotes
                                user={user}
                                quotes={quotes}
                                toggleStarred={toggleStarred}
                                deleteQuote={deleteQuote}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/quote/:quoteId?"
                        component={(props) =>
                            <NewPost
                                {...props}
                                user={user}
                                quotes={quotes}
                                submitQuote={submitQuote}
                                authors={authors}
                            />
                        }
                    />
                    <Route
                        exact
                        path="/authors"
                        component={() => (
                            <Authors
                                quotes={quotes}
                                user={user}
                                toggleStarred={toggleStarred}
                                deleteQuote={deleteQuote}
                                authors={authors}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/authors/:author"
                        component={(routerParams) => (
                            <AuthorQuotes
                                user={user}
                                quotes={quotes}
                                toggleStarred={toggleStarred}
                                deleteQuote={deleteQuote}
                                author={routerParams.match.params.author}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/search"
                        component={() => (
                            <Search
                                quotes={quotes}
                                user={user}
                                toggleStarred={toggleStarred}
                                deleteQuote={deleteQuote}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/starred"
                        component={() => (
                            <Starred
                                quotes={quotes}
                                user={user}
                                toggleStarred={toggleStarred}
                                deleteQuote={deleteQuote}
                            />
                        )}
                    />

                    <BottomNav />
                </div>
            </div>
        </BrowserRouter>
    );
};

export default Router;
