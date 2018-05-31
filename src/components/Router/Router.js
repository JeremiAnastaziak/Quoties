import React from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import Snackbar from 'material-ui/Snackbar';
import NewPost from '../NewPost/NewPost';
import Quotes from '../Quotes/Quotes';
import Authors from '../Authors/Authors';
import Starred from '../Starred/Starred';
import Search from '../Search/Search';
import BottomNav from '../BottomNav/BottomNav';
import Header from '../Header/Header';
import AuthorQuotes from '../AuthorQuotes/AuthorQuotes';

const extractAuthors = (quotes) =>
    Object.values(quotes || {})
        .reduce((curr, next) =>
            curr.includes(next.quoteAuthor) ? curr : curr.concat(next.quoteAuthor), []);

const Router = ({ user, quotes, notifications, submitQuote, deleteQuote }) => {
    const authors = extractAuthors(quotes);
    return (
        <BrowserRouter>
            <div>
                <Header user={user} />
                <div style={{ marginBottom: 'var(--bottom-nav-height)' }}>
                    <Route
                        path="/home"
                        component={() => (
                            <Quotes
                                user={user}
                                quotes={quotes}
                                submitQuote={submitQuote}
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
                                submitQuote={submitQuote}
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
                                submitQuote={submitQuote}
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
                                submitQuote={submitQuote}
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
                                submitQuote={submitQuote}
                                deleteQuote={deleteQuote}
                            />
                        )}
                    />
                    {/* {notifications.map(notification => (
                        <Snackbar
                            style={{ bottom: '57px' }}
                            open={true}
                            message={notification.text}
                        />
                    ))} */}
                    <BottomNav />
                </div>
            </div>
        </BrowserRouter>
    );
};

export default Router;
