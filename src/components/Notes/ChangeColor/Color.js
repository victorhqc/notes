import React from 'react';
import { connect } from 'react-redux';

import { changeColor } from '../../../actions';
import ColorComponent from './ColorComponent';

const mapStateToProps = ( state ) => ({
    selectedColor: state.newNote.color
});

const mapDispatchToProps = ( dispatch ) => ({
    changeColor: (color) => dispatch( changeColor(color) )
});

const Color = connect(
    mapStateToProps,
    mapDispatchToProps
)(ColorComponent);

export default Color;
