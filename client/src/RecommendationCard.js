import React from 'react';

const RecommendationCard = (props) => {
    const { recommender, book_id, title, author, owner, currentlocation, users, rec_id, notes, clearRecommendation } = props;

    let recommenderName;
    users.forEach((user) => {
        if (user['user_id'] === recommender) recommenderName = user.name;
    });

    return (
        <article className='card'>
            <div className='details'>
                <p className='Details'>
                    <strong>Recommended By: </strong>{recommenderName}
                </p>
                <p className='Details'><strong>Title: </strong>{title}  | <strong>Author: </strong>{author} | <strong>Owner: </strong>{owner} | <strong>Current Location: </strong>{currentlocation}</p>
                <div className='notes'>
                    <p className='notesText'><strong>Notes: </strong>{notes}</p>
                </div>
                <div className='buttons'>
                    <button className='clearRecommendation' onClick={() => clearRecommendation(rec_id)}>Clear Recommendation</button>
                </div>
            </div>
        </article>
    )
}

export default RecommendationCard;