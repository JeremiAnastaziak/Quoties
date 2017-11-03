import React from 'react';
import * as firebase from 'firebase';
import { ListItem } from 'material-ui/List';
import QuoteOptions from './QuoteOptions';
import { cyan500, pinkA200, transparent } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';

class Quote extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
  }



  deleteQuote = (quoteId) => {
    this.props.deleteQuote(quoteId);
  }

  editQuote = (quoteId) => {
    this.props.editQuote(quoteId);

  }

  toggleStarred = (quoteId) => {
    this.props.toggleStarred(quoteId);
  }

  renderAvatar = (quote) => {
    console.log(quote)
    return (
      <Avatar
        color={cyan500} backgroundColor={transparent}
        style={{ left: 8 }}
      >
        {quote.quoteAuthor[0]}
      </Avatar>
    )
  }

  render() {
    const quote = this.props.quote;
    const divider = this.props.divider;
    const index = this.props.index;

    const {
      renderAvatar
    } = this.props;

    return (
      <div key={index} className={quote.starred ? 'starred quote' : 'quote'}>
        <ListItem
          key={index}
          primaryText={quote.quoteText}
          secondaryText={
            <div className="secondary-wrapper">
              <p className="author">{quote.quoteAuthor}</p>
              {
                quote.quoteTags && <p className="tags">{
                  quote.quoteTags.map((tag, position) =>
                    <Chip className="tag" backgroundColor={pinkA200} key={`${index}-${position}`}>
                      {tag}
                    </Chip>
                  )}
                </p>
              }
            </div>
          }
          secondaryTextLines={2}
          leftAvatar={
            renderAvatar && this.renderAvatar(quote)
          }
          rightIconButton={
            <QuoteOptions
              key={index}
              qid={index}
              quote={quote}
              starred={quote.starred}
              editQuote={this.editQuote}
              deleteQuote={this.deleteQuote}
              toggleStarred={this.toggleStarred}
            />}
        >
        </ListItem>
      </div>
    )
  }
}

export default Quote;
