import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import './Quote.css';
import { ShareButtons } from 'react-share';

const { FacebookShareButton } = ShareButtons;

const iconButtonElement = (
    <IconButton touch={true} style={{width: '40px',
    height: '40px', padding: '0'}}>
        <MoreVertIcon color={grey400} />
    </IconButton>
);

const QuoteOptions = ({ deleteQuote, submitQuote, qid, quote, starred, history }) => {
    return (
        <div>
            <IconMenu
                iconButtonElement={iconButtonElement}
                style={{ position: 'absolute', top: '5px', right: '0' }}
            >
                <MenuItem onTouchTap={() => deleteQuote(qid)}>Delete</MenuItem>

                <MenuItem onClick={() => history.push(`/quote/${qid}`, { quoteId: qid })}>
                    Edit
                </MenuItem>

                <MenuItem onTouchTap={() => submitQuote(qid, { ...quote, starred: !quote.starred })}>
                    {starred ? 'Remove from favourite' : 'Add to favourite'}
                </MenuItem>
                <MenuItem>
                    <FacebookShareButton
                        url={'https://jeremianastaziak.github.io/'}
                        quote={quote.quoteText}
                        hashtag={'#' + quote.quoteAuthor.replace(' ', '')}
                    >
                        Share on Facebook
                    </FacebookShareButton>
                </MenuItem>
            </IconMenu>
        </div>
    );
};

export default withRouter(QuoteOptions);
