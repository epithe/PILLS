import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Select from 'react-select';

const BookRow = (props) => {
    const { book_id, title, author, owner, libraryid, currentlocation, notes, removeBook, selectedUser, requestBook } = props;
    let displaylocation = props.selectedLibrary.label;
    if (currentlocation !== null) {displaylocation = currentlocation}

    const { userOptions } = props;
    const [ user, setUserLabel ] = useState(userOptions[0].label);
    const [ userid, setUserID] = useState(userOptions[0].value);

    const handleUserChange = e => {
        const idx = e.target.value;
        setUserLabel(userOptions[idx].label);
        setUserID(userOptions[idx].value)
    };

    const saveRec = () => {
        const body = {
            rec_to: userid, // id of user being recommended to
            rec_by: selectedUser['user_id'],  // id of current user
            book_id
        }
        fetch('/api/addRec', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(body)
        })
            .then(() => console.log("Recommendation added!"))
            .catch(err => console.log("Error adding recommendation"))
    }

    const userOptionsList = userOptions.map((userObj, idx) => {
        return (
            <option key={idx} value={idx}>{userObj.label}</option>
        )
    })
    return (
        <article className="card">
            <div className="details">
                
                <p className='Details'><strong>Title: </strong>{title}  | <strong>Author: </strong>{author} | <strong>Owner: </strong>{owner} | <strong>Current Location: </strong>{displaylocation}</p>
                <div className='notes'>
                    <p className='notesText'><strong>Notes: </strong>{notes}</p>
                </div>
                <div className='buttons'>
                    <button className='updateBook'>Update book</button>
                    <button className='removeBook' onClick={() => removeBook(book_id)}>Remove book</button>
                    <button className='request' onClick={() => requestBook(book_id, libraryid, selectedUser)}>Request</button>
                    <Popup trigger={<button className='recommend'>Recommend</button>} closeOnDocumentClick>
                        <p className='recUserSelectText'>Who would you like to recommend this book to?</p>
                        <div className='selectUserRec'>
                            <select className="recUserSelect" name="selectUserRec" id="user-select" onChange={handleUserChange}>
                                {userOptionsList}
                            </select>
                            <button type="button" className='saveButton' onClick={saveRec}>Save</button> 
                        </div>
                    </Popup>
                </div>
            </div>
        </article>
    )
}

export default BookRow;