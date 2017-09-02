import React from 'react';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import './Search.css';
import Quote from '../Quote/Quote'


class Search extends React.Component {

  constructor() {
    super();
    this.state = {
      searchText: ''
    }
  }
  
  componentDidMount() {
    this.input.focus();
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
            quote={quotes[index]}
            index={index}
            user={this.props.user}
            editQuote={this.editQuote} />)
        }
        
      </div>
    )
  }
}

export default Search;