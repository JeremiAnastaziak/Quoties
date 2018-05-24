import React from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import './Header.css';

const Logged = props => {
    return (
        <IconMenu
            iconButtonElement={
                <IconButton>
                    <MoreVertIcon className="more-icon" />
                </IconButton>
            }
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
            <Link to="/home">
                <MenuItem
                    primaryText="Sign out"
                    onClick={() => {
                        firebase
                            .auth()
                            .signOut()
                            .then(() => {})
                            .catch(error => {
                                console.error(error);
                            });
                    }}
                />
            </Link>
        </IconMenu>
    );
};

function Header() {
    return (
        <div>
            <AppBar
                title={
                    <Link
                        to="/home"
                        style={{
                            color: '#fff',
                            textDecoration: 'none',
                            fontWeight: '300'
                        }}
                    >
                        Quoties
                    </Link>
                }
                iconElementRight={<Logged />}
            />
        </div>
    );
}

export default Header;
