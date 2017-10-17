import React from 'react';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import './Search.css';
import Quote from '../Quote/Quote'
import { toggleBodyClass } from '../utils/helpers';

class Search extends React.Component {

  constructor() {
    super();
    this.state = {
      searchText: ''
    }
  }
  
  editQuote = (quoteId) => {
		this.props.editQuote(quoteId);
  }
  
  render(){
    const quotes = this.props.quotes;
    const searchText = this.state.searchText || null;

    return (
      <div>
        <Card className="panel">
          <TextField
            ref={(input) => this.input = input}
            onChange={e => this.setState({ searchText: e.target.value })}
            onFocus={e => this.setState({ edition: true })}
            onBlur={e => this.setState({ edition: false })}
            name="search"
            placeholder="What do you search for?"
            fullWidth
          />
        </Card>
        {
          quotes && Object
          .keys(quotes)
          .filter(index => !searchText || Object.values(quotes[index]).join(' ').toUpperCase().includes(searchText.toUpperCase()))
          .map(index => <Quote
            key={index}
            quote={quotes[index]}
            index={index}
            user={this.props.user}
            editQuote={this.editQuote} />)
        }

        {this.state.edition ? toggleBodyClass('edition-mode') : ''}
        
      </div>
    )
  }
}

export default Search;