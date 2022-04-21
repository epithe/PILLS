import React, { Component } from 'react';
import Select from 'react-select';
import BookRow from "./BookRow"
import AddBook from './AddBook'

class LibraryTable extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            fetchedBooks: false,
            books: [],
            libraryOptions: [],
            selectedLibrary: {
                label: "Em's Apartment",
                value: 1
            },
        }
        this.removeBook = this.removeBook.bind(this);
        this.requestBook = this.requestBook.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getBooks = this.getBooks.bind(this);
    }

    // Function to get books
    getBooks() {
        console.log("getBooks called")
        fetch(`/api/?id=${this.state.selectedLibrary.value}`)
            .then((res) => res.json())
            .then((books) => {
            this.setState({
                books: books,
                fetchedBooks: true
            });
            })
            .catch(err => console.log('LibraryTable.componentDidMount: get books: ERROR: ', err));
    }
    
    // Function to remove book
    removeBook(book_id) {
        const body = {
            book_id
        }
        fetch('/api/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(body)
        })
            .then(this.getBooks())
        // .then(setState({updated: true})) // Should reload component 
            .catch(err => console.log('RemoveBook fetch /api/remove: ERROR: ', err))
    }

    requestBook(book_id, library_id, selectedUser) {
        const body = {
            book_id,
            library_id,
            selectedUser
        }
        fetch('/api/requestBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(body)
        })
            .then(console.log("Request made"))
            .catch(err => console.log("RequestBook fetch /api/requestBook: ERROR:", err));
    }

    // Function to handle change in selected library
    handleChange(selectedLibrary) {
        fetch(`/api/?id=${selectedLibrary.value}`)
            .then((res) => res.json())
            .then((books) => {
            this.setState({
                selectedLibrary,
                books: books,
                fetchedBooks: true
            }, () => {
                console.log('Library selected:', this.state.selectedLibrary)
                });
            })
            .catch(err => console.log('LibraryTable.componentDidMount: get books: ERROR: ', err));
    }

    // Call database to get library options and add them to the state
    componentDidMount() {
        fetch('/api/libraries')
            .then((res) => res.json())
            .then((libraries) => {
                let libraryOptionsArr = [];
                libraries.forEach((el) => {
                    libraryOptionsArr.push({
                        value: el['library_id'],
                        label: el.name
                    })
                })
                return this.setState({
                    libraryOptions: libraryOptionsArr,
                }, () => {
                    this.getBooks();
                })
            })
    }



    render() {
        // Errror checking for books
        if (!this.state.fetchedBooks) return (
            <div>
                <h3>Loading books, please wait.</h3>
            </div>
        );

        const books = this.state.books;

        if (!books) return null;

        if (!books.length) return (
            <div>Sorry, no books here</div>
        )
        
        // Renders books to page
        const BookElems = books.map((book, i) => {
            return(
                <BookRow
                key={i}
                book_id={book.book_id}
                author={book.author}
                title={book.title}
                owner={book.owner}
                currentlocation={book.currentlocation}
                selectedLibrary={this.state.selectedLibrary}
                notes={book.notes}
                libraryid={book.libraryid}
                selectedUser={this.props.selectedUser}
                removeBook={this.removeBook}
                requestBook={this.requestBook}
            />
            )
        })

        return (
            <div className="panel">
                <span className="SelectLibrary">
                    <h4 className="selectText">Select library:</h4>
                    <Select 
                        className="panelSelect"
                        value={this.state.selectedLibrary}
                        onChange={this.handleChange}
                        options={this.state.libraryOptions}
                    />
                </span>
                <div className='bookElements'>
                    {BookElems}
                </div>
                <div className='addBook'>
                    <AddBook libraryOptions={this.state.libraryOptions}/>
                </div>   
            </div>
        )
    }
}

export default LibraryTable;