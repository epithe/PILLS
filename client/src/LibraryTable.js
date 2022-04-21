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

    componentDidMount() {
        // console.log("selected library_id", this.state.selectedLibrary);
        // fetch(`/api/?id=${this.state.selectedLibrary.value}`)
        //     .then((res) => res.json())
        //     .then((books) => {
        //     this.setState({
        //         books: books,
        //         fetchedBooks: true
        //     });
        //     })
        //     .catch(err => console.log('LibraryTable.componentDidMount: get books: ERROR: ', err)); 
        this.getBooks();
    }



    render() {
        console.log("selected library in render", this.state.selectedLibrary)

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
                removeBook={this.removeBook}
            />
            )
        })

        return (
            <div className="library">
                <div className="SelectLibrary">
                    <Select 
                        value={this.state.selectedLibrary}
                        onChange={this.handleChange}
                        options={this.props.libraryOptions}
                    />
                </div>
                <div className='bookElements'>
                    {BookElems}
                </div>
                <div className='addBook'>
                    <AddBook libraryOptions={this.props.libraryOptions}/>
                </div>   
            </div>
        )
    }
}

export default LibraryTable;