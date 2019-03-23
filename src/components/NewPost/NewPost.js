import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import get from 'lodash.get';
import FlatButton from 'material-ui/FlatButton';
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

  submitQuote = (e) => {
    e.preventDefault();

    const quote = {
      ...this.props.quote,
      ...this.state,
      quoteTags: this.state.quoteTags ?
        this.state.quoteTags.trim().split(' ') :
        get(this.props.quote, 'quoteTags') || [],
    };

    if (!quote.quoteText) {
      return false;
    }

    this.props.submitQuote(this.props.quoteId, quote);
  }

  clearForm = () => {
    this.props.history.push('/add');
  }

  render() {
    return (
      <section>
        <FlatButton
          style={{ position: 'absolute', right: 0 }}
          onClick={this.clearForm}
          label="Clear"
          primary
        />
        <form onSubmit={this.submitQuote}>
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
          {get(this.state, 'quoteText') ?
            (<Field
              name="quoteText"
              onChange={this.updateInput}
              floatingLabelText="Text"
              multiLine
              required
              rows={3}
              value={get(this.state, 'quoteText')}
            />)
            :
            (<Field
              name="quoteText"
              onChange={this.updateInput}
              floatingLabelText="Text"
              multiLine
              required
              rows={3}
              defaultValue={get(this.props.quote, 'quoteText')}
            />)
          }
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
            type="submit"
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

export default withRouter(NewPost);
