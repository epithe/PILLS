import React, { Component } from 'react';
import Select from 'react-select';
import RequestCard from './RequestCard';

class RequestPanel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fetchedRequests: false,
            requestedBooks: [],
            requestOptions: [
                {value: "incoming", label: "Incoming"},
                {value: "outgoing", label: "Outgoing"} 
            ],
            selectedOption: {value: "incoming", label: "Incoming"}
        }
        this.getRequests = this.getRequests.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clearRequest = this.clearRequest.bind(this);
    }

    // Function to get requests
    getRequests() {
        console.log("getRequests called")
        const user_id = String(this.props.selectedUser['user_id']);
        fetch(`/api/getRequests/?option=${this.state.selectedOption.value}&userid=${user_id}`)
            .then((data) => data.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    requestedBooks: data,
                    fetchedRequests: true
                })
            })
            .catch(e => console.log(e))
    }

    // Function to delete request
    clearRequest(req_id) {
        console.log("clearRequests called")

        const body = {
            req_id
        }
        fetch('/api/clearRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(body)
        })
            .then(this.getRequests())
        // .then(setState({updated: true})) // Should reload component 
            .catch(err => console.log('clearRequest fetch /api/clearRequest: ERROR: ', err))
    }

    // handleChange for incoming/outcoming request options
    handleChange(selectedOption) {
        const user_id = String(this.props.selectedUser['user_id']);
        const library_id = String(this.props.selectedUser['library_id']);
        fetch(`/api/getRequests/?option=${selectedOption.value}&userid=${user_id}&libraryid=${library_id}`)
            .then((data) => data.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    requestedBooks: data,
                    fetchedRequests: true,
                    selectedOption,
                })
            })
            .catch(e => console.log(e))
    }

    // componentDidMount call get requests
    componentDidMount() {
        this.getRequests();
    }


    render() {
        // Error checking for requests
        if (!this.state.fetchedRequests) return (
            <div>
                <h3>Loading requests, please wait.</h3>
            </div>
        )

        const { requestedBooks } = this.state;

        const requestCards = requestedBooks.map((book, i) => {
            return(
                <RequestCard 
                key={i}
                book_id={book.book_id}
                author={book.author}
                title={book.title}
                owner={book.owner}
                currentlocation={book.currentlocation}
                users={this.props.users}
                requester={book.user_id}
                notes={book.notes}
                req_id={book.req_id}
                clearRequest={this.clearRequest}
                />
            )
        })

        // Map array of requests

        return (
            <div className="panel">
                <div className="SelectRequests">
                    <h4 className="selectText">Select incoming/outgoing:</h4>
                    <Select
                        className='requestSelect'
                        value={this.state.selectedOption}
                        onChange={this.handleChange}
                        options={this.state.requestOptions}
                    />
                </div>
                <div className='requestCards'>
                    {requestCards}
                </div>
            </div>
        )
    }
}

export default RequestPanel;