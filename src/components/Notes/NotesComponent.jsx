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

        this.noteIds = this.registerIds(props.notes);
        this.state = {
            notes: props.notes
        };
    }

    registerIds(notes) {
        if( !notes ) { return []; }
        return notes.map((note) => {
            return note.id
        });
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

    /**
     * This method will store all the notes height in a single object. Each property of this object will be a row of the
     * note's grid.
     * @method storeHeights
     * @return {Void}
     */
    storeHeights() {
        if( this.stored ){ return; }
        this.stored = true;

        const { notes } = this.state;

        let responseNotes = [];
        this.noteIds = this.registerIds(notes);

        notes.forEach(( note, i ) => {
            let el = document.getElementById('note-container-' + i),
                prevRow = this.getPreviousRow( i, responseNotes ),
                yOffset = 0,
                mod = i % this.notesPerRow,
                xOffset = mod * this.noteWidth + (( mod + 1 ) * this.noteMargin);

            if( prevRow) {

                let prevNote;
                prevRow.every((prev) => {
                    if( this.noteIds.indexOf(prev.id) >= 0 ) {
                        prevNote = prev;
                        return false;
                    }

                    return true;
                });

                this.noteIds.splice(
                    this.noteIds.indexOf(prevNote.id),
                    1
                );

                xOffset = prevNote.xOffset;
                yOffset += prevNote.height + prevNote.yOffset + this.noteMargin;
            }

            responseNotes.push(
                Object.assign( {}, note, {
                    index: i,
                    height: el.offsetHeight,
                    yOffset,
                    xOffset
                })
            );
        });

        this.setState({ notes: responseNotes });
    }

    renderNotes( notes ) {

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

            let width = this.noteWidth,
                style = {
                    xOffset: spring(note.xOffset ? note.xOffset : 0),
                    yOffset: spring(note.yOffset ? note.yOffset : 0)
                },
                parentStyle = {
                    position: 'absolute'
                };

            return (
                <div key={i} style={ parentStyle }>
                    <Motion style={ style }>
                        {({ xOffset, yOffset }) => {
                            let transform = `translate3d(${xOffset}px, ${yOffset}px,0)`;
                            return (
                                <div style={{
                                    transiton: 'transform',
                                    transform,
                                    width
                                }} id={'note-container-' + i}>
                                    <NoteComponent note={note} />
                                </div>
                            );
                        }}
                    </Motion>
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
        const { userId, tokenId, fetchNotes } = this.props;

        if( !userId || !tokenId ){ return; }

        fetchNotes(userId, tokenId);
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
