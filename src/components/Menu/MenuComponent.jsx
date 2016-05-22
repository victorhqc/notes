import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Drawer from 'material-ui/Drawer';

export default function MenuComponent( {
    visible,
    user,
    toggleMenu,
    onLogout
} ) {
    user = user || {}

    return (
        <div>
            <AppBar
                title="Notes"
                iconElementLeft={
                    <IconButton
                        onTouchTap={toggleMenu}
                        iconClassName="mi mi-menu">
                    </IconButton>
                }
                iconElementRight={
                    <IconMenu
                        iconButtonElement={
                            <IconButton><MoreVertIcon /></IconButton>
                        }
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        >
                        <MenuItem primaryText="Sign out" onTouchTap={onLogout} />
                    </IconMenu>
                }
            />
            <Drawer
                docked={false}
                onRequestChange={toggleMenu}
                open={visible}>
                <MenuItem>
                    {user.name}
                    {' '}
                    {user.last_name}
                </MenuItem>
            </Drawer>
        </div>
    );
}
