import React, { Component } from "react";
import LibraryTable from './LibraryTable'
import Select from 'react-select';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import RequestPanel from "./Requests";
import RecommendationsPanel from "./Recommendations";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUser: {}
    }
    this.handleChange = this.handleChange.bind(this);
  }

  // Handles changes in user select
  handleChange(selectedUser) {
    let userID = selectedUser.value;
    console.log("userid", userID);
    let currentUser = {};
    console.log(this.state.users)
    this.state.users.forEach((el) => {
      if (el['user_id'] === userID) {
        currentUser = el;
      }
    })
    this.setState({
      selectedUser: currentUser
    })
  }

  // Fetches users from database
  componentDidMount() {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => this.setState({
        users: data,
        selectedUser: data[0],
      }))
  }

  render() {
    const userOptions = [];
    this.state.users.forEach((el) => {
      userOptions.push({
        value: el['user_id'],
        label: el.name
      })
    })
    
    console.log(this.state.users)
    let value;
    userOptions.forEach((el) => {
      if (this.state.selectedUser.name === el[value]) value = this.state.selectedUser.name;
    })

    return (
      <>
        <span className="userSelectLine">
          <h4 className="userSelectText">Select user:</h4>
          <Select 
            className="userSelect" 
            value={value}
            options={userOptions} 
            onChange={this.handleChange}
          />
        </span>
        <h1>
          P.I.L.L.S
        </h1>
        <div className="subtitle">
          <h2>
            Podhorcer Inter-Library Loan System
          </h2>
        </div>
        <Tabs>
          <TabList>
            <Tab>Libraries</Tab>
            <Tab>Requests</Tab>
            <Tab>Recommendations</Tab>
          </TabList>

          <TabPanel>
            <LibraryTable libraryOptions={this.state.libraryOptions} selectedUser={this.state.selectedUser} userOptions={userOptions} users={this.state.users}/>
        </TabPanel>
        <TabPanel>
            <RequestPanel selectedUser={this.state.selectedUser} users={this.state.users}/>
        </TabPanel>
        <TabPanel>
            <RecommendationsPanel selectedUser={this.state.selectedUser} users={this.state.users}/>
        </TabPanel>
        </Tabs>
      </>
    );
  }
}

export default App;
