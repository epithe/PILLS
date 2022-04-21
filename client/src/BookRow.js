import React from 'react';

const BookRow = (props) => {
    const { book_id, title, author, owner, libraryid, currentlocation, notes, removeBook } = props;
    let displaylocation = props.selectedLibrary.label;
    if (currentlocation !== null) {displaylocation = currentlocation}

    return (
        <article className="bookCard">
            <div className="bookDetails">
                
                <p className='Details'><strong>Title: </strong>{title}  | <strong>Author: </strong>{author} | <strong>Owner: </strong>{owner} | <strong>Current Location: </strong>{displaylocation}</p>
                <div className='notes'>
                    <p className='notesText'><strong>Notes: </strong>{notes}</p>
                </div>
                <div className='buttons'>
                    <button className='updateBook'>Update book</button>
                    <button className='removeBook' onClick={() => removeBook(book_id)}>Remove book</button>
                    <button className='request'>Request</button>
                    <button className='recommend'>Recommend</button>
                </div>
            </div>
        </article>
    )
}

export default BookRow;