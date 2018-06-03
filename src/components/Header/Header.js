import React from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SearchIcon from 'material-ui/svg-icons/action/search';

import './Header.css';

const Logged = props => {
    return (
        <IconMenu
            iconButtonElement={
                <IconButton>
                    <MoreVertIcon className="more-icon" />
                </IconButton>
            }
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
            <Link to="/">
                <MenuItem
                    primaryText="Sign out"
                    onClick={() => {
                        firebase
                            .auth()
                            .signOut()
                            .catch(console.error);
                    }}
                />
            </Link>
        </IconMenu>
    );
};

const Search = props => {
    return (
        <IconButton onClick={props.onClick}>
            <SearchIcon color="#fff"/>
        </IconButton>

    )
}

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            search: false
        };
    }
    render() {
        return (
            <div>
                <AppBar
                    title={
                        <Link
                            to="/quotes"
                            style={{
                                color: '#fff',
                                textDecoration: 'none',
                                fontWeight: '300'
                            }}
                        >
                            Quoties
                        </Link>
                    }
                    iconElementRight={
                        <div>
                            <Search onClick={() => this.setState({ search: !this.state.search })} />
                            <Logged />
                        </div>
                    }
                />
                { this.state.search &&
                    <Card className="panel">
                        <TextField
                            ref={input => (this.input = input)}
                            onChange={e => this.setState({ searchText: e.target.value })}
                            onFocus={e => this.setState({ edition: true })}
                            onBlur={e => this.setState({ edition: false })}
                            name="search"
                            placeholder="What do you search for?"
                            fullWidth
                        />
                    </Card>
                }
            </div>
        );
    }
}

export default Header;
