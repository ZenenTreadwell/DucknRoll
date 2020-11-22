// Utilities
import React, { Component } from "react";
import './App.css';
import axios from "axios";

// Reactstrap
import { Container, Row } from 'reactstrap';

// Components
import EntryList from './components/EntryList.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entryList: []
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        axios
        .get('/api/')
        .then(res => this.setState({entryList: res.data}))
        .catch(err => console.log(err));
    };

  render() {
      return(
          <Container>
          <Row>
          <div className="mx-auto mt-5">
          <h1>Duck n' Roll</h1>
          </div>
          </Row>
          <EntryList entries={this.state.entryList} />
          <p>The following data was queried</p>
          <p>{JSON.stringify(this.state.entryList)}</p>
          </Container>
  );
  }
}

export default App;
