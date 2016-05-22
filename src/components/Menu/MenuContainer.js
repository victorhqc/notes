import React, { Component } from 'react';
import { connect } from 'react-redux';

import { removeAccess } from '../../actions';
import MenuComponent from './MenuComponent';

const mapStateToProps = ( state ) => {
    return {};
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        onLogout: () => dispatch( removeAccess() )
    };
};

const MenuContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuComponent);

export default MenuContainer;
