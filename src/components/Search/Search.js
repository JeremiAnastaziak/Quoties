import React from 'react';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import './Search.css';
import Quotes from '../Quotes/Quotes';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
    };
  }

    filterQuotes = (quotes, phrase) => {
      if (!phrase) return quotes;
      const quotesRef = [];
      Object.keys(quotes).filter(index =>
        Object.values(quotes[index])
          .join(' ')
          .toUpperCase()
          .includes(phrase.toUpperCase()) && quotesRef.push(quotes[index]));
      return quotesRef;
    };

    render() {
      const { quotes } = this.props;

      return (
        <div>
          <Card className="panel">
            <TextField
              ref={input => (this.input = input)}
              onChange={e => this.setState({ searchText: e.target.value })}
              name="search"
              placeholder="What do you search for?"
              fullWidth
            />
          </Card>

          <Quotes
            {...this.props}
            quotes={this.filterQuotes({ ...quotes }, this.state.searchText)}
          />

        </div>
      );
    }
}

export default Search;
