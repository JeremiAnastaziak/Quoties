import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NewPost from '../NewPost/NewPost';
import Quotes from '../Quotes/Quotes';
import Authors from '../Authors/Authors';
import Search from '../Search/Search';
import BottomNav from '../BottomNav/BottomNav';
import Header from '../Header/Header';

const Router = ({ quotes, authors, notifications, submitQuote, deleteQuote }) => {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <div style={{ marginBottom: 'var(--bottom-nav-height)' }}>
                    <Route
                        path="/quotes/:author?"
                        component={({ match: { params } }) => (
                            <Quotes
                                author={params.author}
                                quotes={quotes}
                                submitQuote={submitQuote}
                                deleteQuote={deleteQuote}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/authors"
                        component={() => (
                            <Authors
                                authors={authors}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/search"
                        component={() => (
                            <Search
                                quotes={quotes}
                                submitQuote={submitQuote}
                                deleteQuote={deleteQuote}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/starred"
                        component={() => (
                            <Quotes
                                starred
                                submitQuote={submitQuote}
                                deleteQuote={deleteQuote}
                                quotes={quotes}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/quote/:quoteId?"
                        component={(props) =>
                            <NewPost
                                {...props}
                                quotes={quotes}
                                authors={authors}
                                submitQuote={submitQuote}
                            />
                        }
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
