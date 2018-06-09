import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import BottomNav from '../BottomNav/BottomNav';
import Header from '../Header/Header';
import Routes from '../Routes/Routes';

const Router = props => {
    const { quotes, authors, submitQuote, deleteQuote } = props;

    return (
        <BrowserRouter>
            <div>
                <Header />
                <div style={{
                    maxWidth: 'var(--app-max-width)',
                    margin: '0 auto var(--bottom-nav-height)',
                    overflow: 'scroll-y'
                }}>
                <Routes
                    quotes={quotes}
                    authors={authors}
                    submitQuote={submitQuote}
                    deleteQuote={deleteQuote}
                />
                </div>
                <BottomNav />
            </div>
        </BrowserRouter>
    );
};

export default Router;
