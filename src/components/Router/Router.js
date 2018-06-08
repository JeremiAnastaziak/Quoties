import React from 'react';
import ResizeObserver from 'react-resize-observer';
import { BrowserRouter } from 'react-router-dom';
import BottomNav from '../BottomNav/BottomNav';
import Header from '../Header/Header';
import Routes from '../Routes/Routes';

const Router = props => {
    const { quotes, authors, submitQuote, deleteQuote } = props;

    const hideBottomNavOnMobileDeviceKeyboard = (rect) => {
        console.log(rect);
        const html = document.querySelector('html');
        if(rect.height < 300) {
            html.style.setProperty("--bottom-nav-height", "0px");
            return;
        }
        html.style.setProperty("--bottom-nav-height", "57px");
    }

    return (
        <BrowserRouter>
            <div>
                <Header />
                <div style={{
                    maxWidth: 'var(--app-max-width)',
                    minHeight: 'var(--app-wrapper-height)',
                    margin: '0 auto',
                }}>
                    <div style={{
                        height: 'var(--app-wrapper-height)',
                        overflowY: 'scroll',
                    }}>
                    <ResizeObserver onResize={hideBottomNavOnMobileDeviceKeyboard} />
                    <Routes
                        quotes={quotes}
                        authors={authors}
                        submitQuote={submitQuote}
                        deleteQuote={deleteQuote}
                    />
                    </div>
                </div>
                <BottomNav />
            </div>
        </BrowserRouter>
    );
};

export default Router;
