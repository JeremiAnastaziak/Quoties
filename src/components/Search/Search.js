import React from 'react';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import Quotes from '../Quotes/Quotes';

const searchStyles = {
  padding: '0 15px',
  width: '100%',
  position: 'relative',

};
class Search extends React.Component {
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
          <Card style={searchStyles}>
            <TextField
              ref={(input) => { (this.input = input); }}
              onChange={e => this.setState({ searchText: e.target.value })}
              name="search"
              placeholder="What do you search for?"
              fullWidth
            />
          </Card>

          <Quotes
            {...this.props}
            quotes={this.filterQuotes({ ...quotes }, this.state.searchText || '')}
          />

        </div>
      );
    }
}

export default Search;
