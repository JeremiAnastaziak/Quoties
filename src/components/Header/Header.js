import React from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import './Header.css';

const Logged = (props) => {
	return (
		<IconMenu
			iconButtonElement={
				<IconButton><MoreVertIcon className="more-icon" /></IconButton>
			}
			targetOrigin={{ horizontal: 'right', vertical: 'top' }}
			anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
		>
			<MenuItem primaryText="Sign out" onClick={() => {
				firebase.auth().signOut()
					.then(() => {

					})
					.catch((error) => {
						console.error(error);
					});
			}} />
		</IconMenu>
	)
}

function Header(props) {

	return (
		<div>
			<AppBar
				title={<Link to='/' style={{ color: '#fff', textDecoration: 'none' }}>Quoties</Link>}
				iconElementRight={
					props.user && <Logged />
				}
			/>
		</div>
	)
}

export default Header;