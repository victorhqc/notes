import React from 'react';
import { connect } from 'react-redux';

import { changeColor } from '../../../actions';
import ButtonColorComponent from './ButtonColorComponent';

const mapStateToProps = ( state ) => {
    return {
        color: state.newNote.color
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        changeColor: (color) => dispatch( changeColor(color) )
    };
};

const ButtonColor = connect(
    mapStateToProps,
    mapDispatchToProps
)(ButtonColorComponent);

export default ButtonColor;
