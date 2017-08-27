import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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
					onTouchTap={() => props.deleteQuote(props.qid)}>
					Delete
        </MenuItem>
				<MenuItem
					onTouchTap={() => props.editQuote(props.qid)}>
					Edit
				</MenuItem>
				<MenuItem
					onTouchTap={() => props.toggleStarred(props.qid)}>
					{props.starred ? 'Remove from favourite' : 'Add to favourite'}
				</MenuItem>
			</IconMenu>
		</div>
	)
};

export default QuoteOptions;