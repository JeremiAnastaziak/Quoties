import React from 'react'
import { Link } from 'react-router-dom';

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import AddIcon from 'material-ui/svg-icons/editor/mode-edit';
import SearchIcon from 'material-ui/svg-icons/action/search';
import AuthorsIcon from 'material-ui/svg-icons/action/supervisor-account';
import Home from 'material-ui/svg-icons/action/home';
import Favs from 'material-ui/svg-icons/toggle/star';

import './BottomNav.css';

class BottomNav extends React.Component {
    state = {
        selectedIndex: 0,
    };

    select = (index) => this.setState({selectedIndex: index});

    render() {
        return (
          <Paper zDepth={1} className="navigation">
            <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <Link to='/'>
              <BottomNavigationItem
                label="Home"
                icon={<Home />}
                onTouchTap={() => this.select(0)}
              />
            </Link>
              <BottomNavigationItem
                label="Authors"
                icon={<AuthorsIcon />}
                onTouchTap={() => this.select(1)}
              />
              <BottomNavigationItem
                label="Search"
                icon={<SearchIcon />}
                onTouchTap={() => this.select(2)}
              />

              <BottomNavigationItem
                label="Favourites"
                icon={<Favs />}
                onTouchTap={() => this.select(3)}
              />
              <Link to='/new-post'>
                <BottomNavigationItem
                  label="Add"
                  icon={<AddIcon />}
                  onTouchTap={() => {
                    this.select(4)
                  }}
                />
              </Link>
            </BottomNavigation>
          </Paper>
        );
    }
}

export default BottomNav;