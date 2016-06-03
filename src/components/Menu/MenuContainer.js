import React, { Component } from 'react';
import { connect } from 'react-redux';

import { removeAccess, toggleMenu } from '../../actions';
import MenuComponent from './MenuComponent';

const mapStateToProps = ( state ) => {
    return {
        visible: state.menu.visible,
        user: state.user
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        onLogout: () => dispatch( removeAccess() ),
        toggleMenu: () => dispatch( toggleMenu() )
    };
};

const MenuContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuComponent);

export default MenuContainer;
