import React from 'react';

const RequestCard = (props) => {
    const { requester, book_id, title, author, owner, library_id, currentlocation, users, req_id, notes, clearRequest } = props;

    let requesterName;
    users.forEach((user) => {
        if (user['user_id'] === requester) requesterName = user.name
    })

    return (
        <article className='card'>
            <div className='details'>
                <p className='Details'>
                    <strong>Requester: </strong>{requesterName}
                </p>
                <p className='Details'><strong>Title: </strong>{title}  | <strong>Author: </strong>{author} | <strong>Owner: </strong>{owner} | <strong>Current Location: </strong>{currentlocation}</p>
                <div className='notes'>
                    <p className='notesText'><strong>Notes: </strong>{notes}</p>
                </div>
                <div className='buttons'>
                    <button className='clearRequest' onClick={() => clearRequest(req_id)}>Clear Request</button>
                </div>
            </div>
        </article>
    )
}

export default RequestCard;