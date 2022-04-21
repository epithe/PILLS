import React, { useState, useEffect } from 'react';

const useInput = init => {
    const [ value, setValue ] = useState(init);
    const onChange = e => {
        setValue(e.target.value);
    };
    return [ value, onChange ];
}

const AddBook = (props) => {
    const { libraryOptions } = props;
    console.log("addbook", libraryOptions)
    // should get list of libraries from parent (LibraryTable)
    // form with fields: Title, Author, Owner, Library(dropdown), Current Location, Notes
    const [ title, titleOnChange ] = useInput('');
    const [ author, authorOnChange ] = useInput('');
    const [ library, setLibraryLabel ] = useState(libraryOptions[0].label);
    const [ libraryid, setLibraryID] = useState(libraryOptions[0].value);
    const [ owner, ownerOnChange ] = useInput('');
    const [ currLocation, currLocationOnChange ] = useInput('');
    const [ notes, notesOnChange ] = useInput('');

    const handleLibraryChange = e => {
        const idx = e.target.value;
        setLibraryLabel(libraryOptions[idx].label);
        setLibraryID(libraryOptions[idx].value)
    };

    const saveBook = () => {
        const body = {
            title,
            author,
            library,
            libraryid,
            owner,
            currLocation,
            notes
        };
        fetch('/api/addbook', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(body)
        })
            .then(() => console.log("Book added!"))
            .catch(err => console.log("Error adding book"))
    }
    
    const libraryOptionsList = libraryOptions.map((libraryObj, idx) => {
        return (
            <option key={idx} value={idx}>{libraryObj.label}</option>
        )
    })

    return(
        <section className='addBookSection'>
            <h3>Add a book:</h3>
            <section className="addBookForm">
            <span className='addBookField'>
                <label htmlFor="Title">Title: </label>
                <input name="title" value={title} onChange={titleOnChange} />
            </span>
            <span className='addBookField'>
                <label htmlFor="Author">Author: </label>
                <input name="author" value={author} onChange={authorOnChange} />
            </span>
            <span className='addBookField'>
                <label htmlFor="Library">Library: </label>
                <select name="library" id="library-select" onChange={handleLibraryChange}>
                    {libraryOptionsList}
                </select>
            </span>
            <span className='addBookField'>
                <label htmlFor="owner">Owner: </label>
                <input name="owner" value={owner} onChange={ownerOnChange} />
            </span>
            <span className='addBookField'>
                <label htmlFor="currentLocation">Current Location: </label>
                <input name="currentLocation" value={currLocation} onChange={currLocationOnChange} />
            </span>
            <span className='addBookField'>
                <label htmlFor="notes">Notes: </label>
                <input name="notes" value={notes} onChange={notesOnChange} />
            </span>

            </section>  
            <button type="button" className='saveButton' onClick={saveBook}>Save</button> 
        </section>
    )
}

export default AddBook;