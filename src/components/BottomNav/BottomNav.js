import React from 'react';
import { withRouter } from 'react-router-dom';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import AddIcon from 'material-ui/svg-icons/editor/mode-edit';
import SearchIcon from 'material-ui/svg-icons/action/search';
import AuthorsIcon from 'material-ui/svg-icons/action/supervisor-account';
import HomeIcon from 'material-ui/svg-icons/action/home';
import StarredIcon from 'material-ui/svg-icons/toggle/star';
import classNames from 'classnames';
import { routes } from 'config.js';

const paperStyles = {
  height: 'var(--bottom-nav-height)',
  width: '100vw',
  overflow: 'hidden',
  borderBottom: '1px solid var(--color-grey)',
  position: 'fixed',
  zIndex: '1',
  bottom: '0',
};

const iconsMap = {
  Home: <HomeIcon />,
  Authors: <AuthorsIcon />,
  Search: <SearchIcon />,
  Starred: <StarredIcon />,
  Quote: <AddIcon />,
};

const BottomNav = ({ history }) => {
  const matchPathname = route => window.location.pathname.includes(route.slice(1));

  return (
    <Paper zDepth={1} style={paperStyles}>
      <BottomNavigation>
        {routes.map(route => (
          <BottomNavigationItem
            key={route.path}
            label={route.label}
            icon={iconsMap[route.label]}
            onTouchTap={() => history.push(route.path)}
            className={classNames({ active: matchPathname(route.path) })}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default withRouter(BottomNav);
