import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import './LoadingScreen.css';

const screenStyles = {
    position: 'absolute',
    zIndex: '99999',
    width: '100vw',
    height: '100vh',
    background: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const LoadingScreen = () =>
    <div style={screenStyles}>
        <CircularProgress size={80} thickness={5} />
    </div>

export default LoadingScreen;
