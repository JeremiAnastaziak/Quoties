import React from 'react';
import { Route } from 'react-router-dom';
import NewPost from '../NewPost/NewPost';
import Quotes from '../Quotes/Quotes';
import Authors from '../Authors/Authors';
import Search from '../Search/Search';

const Routes = (props) => {
  const { quotes, authors, notifications, submitQuote, deleteQuote } = props;
  return (
    <div>
      <Route
          exact
          path="/"
          component={({ match: { params } }) => (
              <Quotes
                  author={params.author}
                  quotes={quotes}
                  submitQuote={submitQuote}
                  deleteQuote={deleteQuote}
              />
          )}
      />
      <Route
          path="/quotes/:author?"
          component={({ match: { params } }) => (
              <Quotes
                  author={params.author}
                  quotes={quotes}
                  submitQuote={submitQuote}
                  deleteQuote={deleteQuote}
              />
          )}
      />
      <Route
          exact
          path="/authors"
          component={() => (
              <Authors
                  authors={authors}
              />
          )}
      />
      <Route
          exact
          path="/search"
          component={() => (
              <Search
                  quotes={quotes}
                  submitQuote={submitQuote}
                  deleteQuote={deleteQuote}
              />
          )}
      />
      <Route
          exact
          path="/starred"
          component={() => (
              <Quotes
                  starred
                  submitQuote={submitQuote}
                  deleteQuote={deleteQuote}
                  quotes={quotes}
              />
          )}
      />
      <Route
          exact
          path="/add/:quoteId?"
          component={(props) =>
              <NewPost
                  {...props}
                  quotes={quotes}
                  authors={authors}
                  submitQuote={submitQuote}
              />
          }
      />
    </div>
  )
}

export default Routes;
