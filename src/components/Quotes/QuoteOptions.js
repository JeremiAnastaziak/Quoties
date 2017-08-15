import React from 'react';
import * as firebase from 'firebase';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Snackbar from 'material-ui/Snackbar';

import './Quotes.css';

const iconButtonElement = (
	<IconButton touch={true} >
	  <MoreVertIcon color={grey400} />
	</IconButton>
  );

class QuoteOptions extends React.Component {

	constructor(props) {
        super();

        this.state = {
            deleted: false
        }
	}

	deleteQuote = () => {
		console.log(this.props.qid);
		const qRef = firebase.database().ref(`/users/${this.props.uid}/quotes/${this.props.qid}`)
		qRef.remove()
			.then( () => {
                console.log('Q deleted')
                this.setState({
                    deleted: true
                })
			})
			.catch( (error) => {
				console.log(error);
			})
	}

	render() {
		return (
            <div>
                <IconMenu 
                    iconButtonElement={iconButtonElement} 
                    style={{position: 'absolute', top: '10px', right: '5px'}}
                    >
                    <MenuItem 
                        onTouchTap={() => this.deleteQuote()}
                    >
                    Delete
                    </MenuItem>
                </IconMenu>
            </div>
		)
	}
};

export default QuoteOptions;