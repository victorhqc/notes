import React, { Component } from 'react';
import {Motion, spring} from 'react-motion';

import NoteComponent from './NoteComponent';

export default class NotesComponent extends Component {

    constructor(props) {
        super(props);

        this.container = null;
        this.containerRect = null;
        this.notesPerRow = 4;
        this.containerWidth = 0;
        this.noteWidth = 0;
        this.noteMargin = 15;
        this.stored = false;

        this.state = {
            notes: props.notes
        };
    }

    /**
     * Returns the previous row of notes ordered by height (smallest first)
     * @method getPreviousRow
     * @param  {Integer}       index
     * @return {Array|Bool}    false if its the index is in the first row
     */
    getPreviousRow( index, notes ) {
        if( index < this.notesPerRow ) { return false; } // This is the first row

        // if the result is 1, it means this is the first element of the next row, if the result is notesPerRow - 1
        // its the last element of the row.
        let mod = index % this.notesPerRow;

        let lastPrevRowElement = ( index - 1 ) - mod,
            firstPrevRowElement = ( lastPrevRowElement + 1 ) - this.notesPerRow;

        return notes.slice(firstPrevRowElement, lastPrevRowElement + 1)
        .sort((a, b) => {
            return  a.height - b.height;
        });
    }

    calculateXOffset( index, notes ) {
        // if the result is 0, its the first element of the row.
        let mod = index % this.notesPerRow,
            prevRow = this.getPreviousRow( index, notes );

        if(! prevRow ) {
            return mod * this.noteWidth + (( mod + 1 ) * this.noteMargin);
        }

        prevRow = prevRow.filter((note) => {
            if(note.usedX) { return; }
            return note;
        });

        if(prevRow && prevRow[0].sorted) {
            let noteIndex = prevRow[0].index || 0;
            this.state.notes[noteIndex].usedX = true;

            let el = document.getElementById('note-container-' + noteIndex),
                transform = el.style.transform,
                offset = parseInt(transform.match(/([0-9]+)/g)[1]);

            console.log('el', el);
            console.log('el.style', el.style, parseInt(transform.match(/([0-9]+)/g)[1]));
            console.log('offset', offset);

            return offset;
        }

        return 15;
    }

    calculateYOffset( index, notes ) {
        let prevRow = this.getPreviousRow( index, notes ),
            noteIndex = 0,
            top = 0;

        if( !prevRow ) { return  0; }

        prevRow = prevRow.filter((note) => {
            if(note.usedY) { return; }
            return note;
        });

        if(prevRow && prevRow[0].sorted) {
            let noteIndex = prevRow[0].index || 0;
            this.state.notes[noteIndex].usedY = true;
            top = prevRow[0].top
        }

        return top;
    }

    /**
     * This method will store all the notes height in a single object. Each property of this object will be a row of the
     * note's grid.
     * @method storeHeights
     * @return {Void}
     */
    storeHeights() {
        if( this.stored ){ return; }
        this.stored = true;
        let notes = this.state.notes,
            responseNotes = [];

        notes.forEach(( note, i ) => {
            let el = document.getElementById('note-container-' + i),
                prevRow = this.getPreviousRow( i, responseNotes ),
                top = el.offsetHeight + this.noteMargin;

            if( prevRow ) {
                prevRow = prevRow.filter((note) => {
                    if(note.sorted) { return; }
                    return note;
                });

                responseNotes[prevRow[0].index].sorted = true;
                top += prevRow[0].top + this.noteMargin;
            }

            responseNotes.push(
                Object.assign( {}, note, {
                    index: i,
                    height: el.offsetHeight,
                    usedY: false,
                    usedX: false,
                    sorted: false,
                    top
                })
            );
        });

        console.log('responseNotes', responseNotes);
        this.setState({ notes: responseNotes });
    }

    renderNotes( notes ) {

        console.log('renderNotes', notes);
        return notes.map(( note, i ) => {
            // To get the "x" offset, the previous row must be obtained, and get the actual shortest (unused) note is.
            // After getting that, the x and y coordinates of the current note can be assigned, the shortest note used,
            // will be marked in order to avoid considering it again for the next note.

            // The Notes Matrix can be expressed as following n{x}{y}
            // n00,   n10,   n20,   n30   ... n{x}0
            // n10,   n11,   n21,   n31   ... n{x}1,
            // ...
            // n0{y}, n1{y}, n2{y}, n3{y} ... n{x}{y}
            //
            // where n00 is the newest note and n{x}{y} is the oldest
            //
            // The Note's array would be
            // [n00, n10, n20, n30, ..., n{x}0, n10, n11, n21, n31, ... n{x}1]

            let transform = `translate3d(${this.calculateXOffset(i, notes)}px, ${this.calculateYOffset(i, notes)}px,0)`;

            let width = this.noteWidth,
                style = {
                    transiton: 'transform',
                    transform,
                    width
                };

            /*let motionStyle = {
                translateX: spring(),
                translateY: spring()
            };

            return (
                <Motion key={ i } style={ style } id={"motion-note-" + i}>
                    { ( { translateX, translateY } ) => {
                        <NoteComponent note={note} style= {
                            transition: 'transform',
                            transform: `translate(${ (width * i ) + 10 + (10 * i) }px, 0)`,
                            width
                        }/>
                    }}
                </Motion>
            );*/

            return (
                <div key={i} style={{
                        position: 'absolute'
                    }}>
                    <div style={ style } id={'note-container-' + i}>
                        <NoteComponent note={note} />
                    </div>
                </div>
            );
        });

    }

    defineDimensions() {
        this.container = document.getElementById('notes-container');
        this.containerWidth = this.container.offsetWidth;
        // 4 notes by screen size.
        // TODO: Change this for a more dynamic way for small screens.
        this.noteWidth = (this.containerWidth / this.notesPerRow) - (this.noteMargin * 2); // 15 margin for each side

        this.containerRect = this.container.getBoundingClientRect();
    }

    componentDidUpdate() {
        this.storeHeights();
    }

    componentWillReceiveProps({ notes }) {
        this.setState({ notes })
    }

    componentWillUpdate({ notes }) {
        if(this.props.notes !== notes) {
            this.stored = false;
        }
    }

    componentDidMount() {
        this.defineDimensions();
    }

    render() {
        const { notes } = this.state;

        const style = {
            marginTop: 20,
            position: 'relative'
        };

        return (
            <div style={ style } id="notes-container">
                { this.renderNotes( notes ) }
            </div>
        );
    }
}
