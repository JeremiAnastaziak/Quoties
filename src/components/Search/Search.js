import React from 'react';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import './Search.css';

class Search extends React.Component {
  componentDidMount() {
    this.input.focus();
  }
  render(){
    return (
      <div>
        <Card className="panel">
          <TextField
            ref={(input) => this.input = input}
            name="search"
            placeholder="What do you search for?"
            fullWidth
          />
        </Card>
        <p>This feature is under development</p>
        
      </div>
    )
  }
}

export default Search;