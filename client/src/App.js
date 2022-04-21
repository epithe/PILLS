import React, { Component } from "react";
import LibraryTable from './LibraryTable'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      libraryOptions: [],
    }
  }

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
          console.log("libraryoptions", libraryOptionsArr)
          return this.setState({
              libraryOptions: libraryOptionsArr,
          })
      })
  }

  render() {
    return (
      <>
        <h1>
          P.I.L.L.S
        </h1>
        <h2>
          Podhorcer Inter-Library Loan System
        </h2>
        <LibraryTable libraryOptions={this.state.libraryOptions}/>
      </>
    );
  }
}

export default App;
