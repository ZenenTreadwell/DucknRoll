// Utilities
import React, { Component } from "react";
import './App.css';
import axios from "axios";

// Reactstrap
import { Container, Row } from 'reactstrap';

// Components
import EntryList from './components/EntryList.js';
import EntryModal from './components/EntryModal.js';

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
          <p>Are you a duck-aficianado? Do those avian friends ruffle your feathers in just the right way? Well, if you're the type of person to record your interactions
          with the local duck population and then post them onto the internet, then you're in the right place!</p>
          <p><i>Please note that this website was designed in a rush, and therefore some things (form validation and overall appearance) are a little rough around the
          edges. Duck-science doesn't pay the bills very well</i></p>

          <EntryList entries={this.state.entryList} />
          <EntryModal update={this.refreshList} />
          </Container>
  );
  }
}

export default App;
