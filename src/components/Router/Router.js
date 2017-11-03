import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Login from '../Login/Login';
import NewPost from '../NewPost/NewPost';
import Feed from '../Feed/Feed';
import Authors from '../Authors/Authors';
import Starred from '../Starred/Starred';
import Search from '../Search/Search';
import BottomNav from '../BottomNav/BottomNav';
import Header from '../Header/Header';

const Router = ({ user, quotes, submitQuote }) => {
    return (
        <HashRouter>
            <div>
                <Header user={user} />
                <div style={{marginBottom: '55px'}}>
                    <Route
                        exact
                        path="/"
                        component={() => <Feed user={user} quotes={quotes} />}
                    />
                    <Route
                        exact
                        path="/quote"
                        component={routerParams => (
                            <NewPost
                                quotes={quotes}
                                user={user}
                                edition={routerParams.location.state}
                                submitQuote={submitQuote}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/authors"
                        component={() => <Authors quotes={quotes} user={user} />}
                    />
                    <Route
                        exact
                        path="/search"
                        component={() => <Search quotes={quotes} user={user} />}
                    />
                    <Route
                        exact
                        path="/starred"
                        component={() => <Starred quotes={quotes} user={user} />}
                    />

                    <BottomNav />
                </div>
            </div>
        </HashRouter>
    );
};

export default Router;
