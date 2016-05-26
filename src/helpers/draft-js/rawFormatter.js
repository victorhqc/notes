
function convertBlockToHTML( block ) {
    if ( !block ) { return ''; }

    const text = block.text;

    return `<p>${text}</p>`;
}

/**
 * Converts a RawDraftContentState into HTML Text so it can be stored into DB easily
 * @method convertToHTML
 * @param  {Object}      RawDraftContentState
 * @return {String}      HTML Text
 */
export function convertToHTML( rawDraftContentState ) {

    let text = '';
    rawDraftContentState.blocks.forEach( (block, i) => {
        text += convertBlockToHTML(block);

        if( i < rawDraftContentState.blocks.length - 1 ) {
            text += '\n';
        }
    });

    return text;
}
