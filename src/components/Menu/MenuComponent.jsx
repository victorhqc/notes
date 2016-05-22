import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

export default function MenuComponent( {
    onLogout
} ) {
    return (
        <AppBar
            title="Notes"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            iconElementRight={
                <IconMenu
                    iconButtonElement={
                        <IconButton><MoreVertIcon /></IconButton>
                    }
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                    <MenuItem primaryText="Sign out" onClick={onLogout} />
                </IconMenu>
            }
            />
    );
}
