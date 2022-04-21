import React, { Component } from 'react';
import RecommendationCard from './RecommendationCard';

class RecommendationsPanel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fetchedRecs: false,
            recommendedBooks: [],
        }
        this.getRecommendations = this.getRecommendations.bind(this);
        this.clearRecommendation = this.clearRecommendation.bind(this);
    }

    //Function to get recommendations
    getRecommendations() {
        console.log("getRecommendations called")
        const user_id = String(this.props.selectedUser['user_id']);
        fetch(`/api/getRecs/?userid=${user_id}`)
            .then((data) => data.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    recommendedBooks: data,
                    fetchedRecs: true
                })
            })
            .catch(e => console.log(e))
    }

    //Function to delete recommendation
    clearRecommendation(rec_id) {
        console.log("clearRecommendation called")

        const body = {
            rec_id
        }
        fetch('/api/clearRecommendation', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(body)
        })
            .then(this.getRecommendations())
        // .then(setState({updated: true})) // Should reload component 
            .catch(err => console.log('clearRecommendation fetch /api/clearRecommendation: ERROR: ', err))

    }

    componentDidMount() {
        this.getRecommendations();
    }

    render() {

        if (!this.state.fetchedRecs) return (
            <div>
                <h3>Loading recommendations, please wait.</h3>
            </div>
        )

        const { recommendedBooks } = this.state;

        const recCards = recommendedBooks.map((book, i) => {
            return(
                <RecommendationCard
                key={i}
                book_id={book.book_id}
                author={book.author}
                title={book.title}
                owner={book.owner}
                currentlocation={book.currentlocation}
                users={this.props.users}
                recommender={book.recd_by_id}
                notes={book.notes}
                rec_id={book.rec_id}
                clearRecommendation={this.clearRecommendation}
                />
            )
        })

        return(
            <div className="panel">
                <div className='recCards'>
                    {recCards}
                </div>
            </div> 
        )
    }
}

export default RecommendationsPanel;