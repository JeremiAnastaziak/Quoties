import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
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
      <div className="wrapper">
					Home
						<Link to='/new-post'>
							<FloatingActionButton className="floating-btn">
								<ContentAdd />
							</FloatingActionButton>
						</Link>
      </div>
    );
  }
}

export default Home;