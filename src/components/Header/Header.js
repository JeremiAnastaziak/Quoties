import React from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import './Header.css';
import Capture from '../Capture/Capture';

const Logged = (props) => {
	return (
		<IconMenu
			iconButtonElement={
				<IconButton><MoreVertIcon className="more-icon" /></IconButton>
			}
			targetOrigin={{ horizontal: 'right', vertical: 'top' }}
			anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
		>
			<Link to='/'>
				<MenuItem primaryText="Sign out" onClick={() => {
					firebase.auth().signOut()
						.then(() => {
						})
						.catch((error) => {
							console.error(error);
						});
				}} />
				<MenuItem primaryText="Capture quote" onClick={() => 
					<input type="file" name="pic" accept="image/*" />
					} />
			</Link>
		</IconMenu>
	)
}

function Header(props) {

	return (
		<div>
			<AppBar
				title={<Link to='/' style={{ color: '#fff', textDecoration: 'none', fontWeight: '300' }}>Quoties</Link>}
				iconElementRight={
					props.user && <Logged />
				}
			/>
		</div>
	)
}

export default Header;