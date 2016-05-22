import React, { Component } from 'react';
import { connect } from 'react-redux';

import { removeAccess, toggleMenu, USER } from '../../actions';
import MenuComponent from './MenuComponent';

const mapStateToProps = ( state ) => {
    return {
        visible: state.menu.visible,
        user: state.session[USER]
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
