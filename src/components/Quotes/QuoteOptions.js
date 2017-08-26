import React from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Snackbar from 'material-ui/Snackbar';

import './Quotes.css';

const iconButtonElement = (
	<IconButton touch={true} >
		<MoreVertIcon color={grey400} />
	</IconButton>
);

function QuoteOptions(props) {

	return (
		<div>
			<IconMenu
				iconButtonElement={iconButtonElement}
				style={{ position: 'absolute', top: '10px', right: '5px' }}>
				<MenuItem
					onTouchTap={() => props.deleteQuote(props.uid, props.qid)}>
					Delete
        </MenuItem>
				<Link to='quote'>
					<MenuItem>
						Edit
					</MenuItem>
				</Link>
			</IconMenu>
		</div>
	)
};

export default QuoteOptions;