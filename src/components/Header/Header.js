import React from 'react';
import * as firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const appBarStyles = {
  maxWidth: 'var(--app-max-width)',
  margin: '0 auto',
  boxShadow: 'none',
};
function Header(props) {
  const { history } = props;
  const goToQuotes = () => history.push('/quotes');

  return (
    <div style={{ backgroundColor: 'var(--color-accent)' }}>
      <AppBar
        style={appBarStyles}
        title="Quoties"
        titleStyle={{ fontWeight: 300, cursor: 'pointer' }}
        showMenuIconButton={false}
        onTitleTouchTap={goToQuotes}
        iconElementRight={<Logged />}
      />
    </div>
  );
}

const Logged = () => {
  const logOut = () =>
    firebase
      .auth()
      .signOut()
      .catch(console.error);

  return (
    <IconMenu
      iconButtonElement={
        <IconButton iconStyle={{ color: '#fff' }}>
          <MoreVertIcon className="more-icon" />
        </IconButton>
            }
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <MenuItem
        primaryText="Sign out"
        onClick={logOut}
      />
    </IconMenu>
  );
};

export default withRouter(Header);
