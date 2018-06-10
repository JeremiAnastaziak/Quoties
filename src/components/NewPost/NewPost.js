import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import './NewPost.css';
import Capture from '../Capture/Capture';

class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      quoteText: '',
      quoteAuthor: '',
      quoteTitle: '',
      quoteTags: '',
    };
  }

  componentDidMount() {
    const { quoteId } = this.props.match.params;

    if (this.props.quotes && quoteId) {
      const quote = this.props.quotes[quoteId];

      this.setState({
        ...quote,
        quoteTags: quote.quoteTags && (`${quote.quoteTags.join(' ')} `),
      });
    }
  }

  updateInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  submitQuote = (e) => {
    e.preventDefault();

    const { quoteId } = this.props.match.params;

    this.props.submitQuote(quoteId, {
      quoteAuthor: this.state.quoteAuthor,
      quoteText: this.state.quoteText,
      quoteTitle: this.state.quoteTitle,
      quoteTags: this.state.quoteTags ? this.state.quoteTags.trim().split(' ') : [],
    });
  }

  render() {
    return (
      <div className="wrapper">
        <form ref={form => this.quoteForm = form}>
          <AutoComplete
            className="field"
            name="quoteAuthor"
            ref={input => this.qAuthor = input}
            onUpdateInput={value => this.setState({ quoteAuthor: value })}
            floatingLabelText="Author"
            fullWidth
            required
            searchText={this.state.quoteAuthor}
            filter={AutoComplete.caseInsensitiveFilter}
            autoComplete="off"
            dataSource={this.props.authors}
            floatingLabelFixed
          />
          <TextField
            className="field"
            name="quoteText"
            ref={input => this.qText = input}
            onChange={this.updateInput}
            floatingLabelText="Text"
            multiLine
            rows={3}
            fullWidth
            required
            autoComplete="off"
            value={this.state.quoteText}
            floatingLabelFixed
          />
          <TextField
            className="field"
            name="quoteTitle"
            onChange={this.updateInput}
            floatingLabelText="Source"
            autoComplete="off"
            fullWidth
            value={this.state.quoteTitle}
            floatingLabelFixed
          />
          <TextField
            className="field"
            name="quoteTags"
            onChange={this.updateInput}
            floatingLabelText="Tags"
            autoComplete="off"
            fullWidth
            value={this.state.quoteTags}
            floatingLabelFixed
          />
          <div style={{ padding: '5px' }}>
            <RaisedButton
              className="button"
              type="input"
              fullWidth
              onClick={this.submitQuote}
              label={this.props.match.params.quoteId ? 'Update quote' : 'Submit quote'}
              primary
            />
          </div>
        </form>
        <Capture fillQuoteText={quoteText => this.setState({ quoteText })} />
      </div>
    );
  }
}

export default NewPost;
