import React, { Component } from 'react';
import get from 'lodash.get';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import Capture from '../Capture/Capture';
import Field from '../Field/Field';

class NewPost extends Component {
  updateInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  submitQuote = () => {
    const quote = {
      ...this.props.quote,
      ...this.state,
      quoteTags: this.state.quoteTags ?
        this.state.quoteTags.trim().split(' ') :
        this.props.quoteTags || [],
    };

    this.props.submitQuote(this.props.quoteId, quote);
  }

  render() {
    return (
      <section>
        <form>
          <AutoComplete
            name="quoteAuthor"
            onUpdateInput={value => this.setState({ quoteAuthor: value })}
            floatingLabelText="Author"
            fullWidth
            required
            searchText={get(this.props.quote, 'quoteAuthor')}
            filter={AutoComplete.caseInsensitiveFilter}
            autoComplete="off"
            dataSource={this.props.authors}
            floatingLabelFixed
          />
          <Field
            name="quoteText"
            onChange={this.updateInput}
            floatingLabelText="Text"
            multiLine
            rows={3}
            defaultValue={get(this.props.quote, 'quoteText')}
          />
          <Field
            name="quoteTitle"
            onChange={this.updateInput}
            floatingLabelText="Source"
            defaultValue={get(this.props.quote, 'quoteTitle')}

          />
          <Field
            name="quoteTags"
            onChange={this.updateInput}
            floatingLabelText="Tags"
            defaultValue={get(this.props.quote, 'quoteTags', []).join(' ')}
          />
          <RaisedButton
            type="input"
            onClick={this.submitQuote}
            label={this.props.quoteText ? 'Update quote' : 'Submit quote'}
            fullWidth
            primary
          />
        </form>
        <Capture fillQuoteText={quoteText => this.setState({ quoteText })} />
      </section>
    );
  }
}

export default NewPost;
