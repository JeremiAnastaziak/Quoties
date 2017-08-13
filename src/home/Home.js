import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Quotes from '../quotes/Quotes.js'
import {
  Link
} from 'react-router-dom';
class Home extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
	}

  render() {
    return (
      <div>
					<Quotes></Quotes>
					<Link to='/new-post'>
						<FloatingActionButton className="floating-btn" mini={true}>
							<ContentAdd />
						</FloatingActionButton>
					</Link>
      </div>
    );
  }
}

export default Home;