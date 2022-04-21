import React, { Component } from 'react';
import Select from 'react-select';

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
    }

    // Function to get requests
    getRequests() {
        console.log("getRequests called")
        const user_id = String(this.props.selectedUser['user_id']);
        const library_id = String(this.props.selectedUser['library_id']);
        console.log(typeof user_id, typeof library_id)
        fetch(`/api/getRequests/?option=${this.state.selectedOption.value}&userid=${user_id}&libraryid=${library_id}`)
    }

    // Function to delete request

    // handleChange for incoming/outcoming request options
    handleChange(selectedOption) {

    }

    // componentDidMount call get requests
    componentDidMount() {
        this.getRequests()
    }

    render() {
        // Error checking for requests

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

            </div>
        )
    }
}

export default RequestPanel;