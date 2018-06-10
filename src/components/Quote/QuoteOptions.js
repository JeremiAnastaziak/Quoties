import React from 'react';
import { withRouter } from 'react-router-dom';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import './Quote.css';
import { ShareButtons } from 'react-share';

const { FacebookShareButton } = ShareButtons;

const iconButtonElement = (
  <IconButton
    touch
    style={{
        width: '40px',
        height: '40px',
        padding: '0',
    }}
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const QuoteOptions = ({
  deleteQuote, submitQuote, quoteId, quote, history,
}) => (
  <IconMenu
    iconButtonElement={iconButtonElement}
    style={{ position: 'absolute', top: '5px', right: '0' }}
  >
    <MenuItem onTouchTap={() => deleteQuote(quoteId)}>
                Delete
    </MenuItem>
    <MenuItem onClick={() => history.push(`/add/${quoteId}`, { quoteId })}>
                Edit
    </MenuItem>
    <MenuItem onTouchTap={() => submitQuote(quoteId, { ...quote, starred: !quote.starred })}>
      {quote.starred ? 'Remove from favourite' : 'Add to favourite'}
    </MenuItem>
    <MenuItem>
      <FacebookShareButton
        url="https://quoties.github.io/"
        quote={quote.quoteText}
        hashtag={`#${quote.quoteAuthor.replace(' ', '')}`}
      >
                    Share on Facebook
      </FacebookShareButton>
    </MenuItem>
  </IconMenu>
);

export default withRouter(QuoteOptions);
