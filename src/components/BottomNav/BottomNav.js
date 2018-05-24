import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import AddIcon from 'material-ui/svg-icons/editor/mode-edit';
import SearchIcon from 'material-ui/svg-icons/action/search';
import AuthorsIcon from 'material-ui/svg-icons/action/supervisor-account';
import HomeIcon from 'material-ui/svg-icons/action/home';
import StarredIcon from 'material-ui/svg-icons/toggle/star';
import classNames from 'classnames';

import './BottomNav.css';

import { routes } from 'config';

function BottomNav({ history }) {

  const matchPathname = (route) => window.location.pathname === route;

  const iconsMap = {
    'Home': <HomeIcon />,
    'Authors': <AuthorsIcon />,
    'Search': <SearchIcon />,
    'Starred': <StarredIcon />,
    'Quote': <AddIcon />
  }

  return (
    <Paper zDepth={1} className="navigation">
      <BottomNavigation>
        {routes.map(route => (
          <BottomNavigationItem
            key={route.path}
            label={route.label}
            icon={iconsMap[route.label]}
            onTouchTap={() => history.push(route.path)}
            className={classNames({ 'active': matchPathname(route.path) })}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}

export default withRouter(BottomNav);
