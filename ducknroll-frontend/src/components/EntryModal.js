import React, { Component } from "react";

import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from "reactstrap";
import LocationMap from "./LocationMap.js";
import axios from "axios";

class EntryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            feedDate: "2000-01-01",
            feedTime: "12:00:00Z",
            feedDateTime: "2020-01-01T00:00:00Z",
            feedType: "",
            feedAmt: 0,
            feedLoc: [48.45, -123.35],
            flockSize: 0,
        };
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        const { feedDate, feedTime, feedType, feedAmt, feedLoc, flockSize } = this.state;
        // specific formatting makes the API happy
        let datetime = `${feedDate}T${feedTime}Z`;
        let locString = `POINT (${feedLoc[1]} ${feedLoc[0]})`;

        axios
            .post('/api/', { feedDate, feedTime: datetime, feedType, feedAmt, feedLoc: locString, flockSize })
            .then(res => this.props.update())
            .catch(err => console.log(err));

        this.toggleModal();
    }

    toggleModal = () => this.setState({show: !this.state.show});

    setPosition = (x,y) => this.setState({feedLoc: [x,y]});

    render() {
        const { feedDate, feedTime, feedType, feedAmt, feedLoc, flockSize } = this.state;
        return (
        <>
        <Button variant="primary" onClick={this.toggleModal}>
        Add an entry
        </Button>

        <Modal isOpen={this.state.show} onHide={this.toggleModal} >
        <ModalHeader closeButton>
        Submit a Duck Report
        </ModalHeader>
            <form onSubmit={this.onSubmit}>
            <ModalBody>
            <label for="time">When did you feed them? </label>
            <div className="float-right">
            <input type="time" name="feedTime" value={feedTime} onChange={this.onChange}/>
            <input type="date" name="feedDate" value={feedDate} onChange={this.onChange}/><br/>
            </div>
            <hr/>
            <label for="flockSize">How many ducks were in the flock? </label>
            <input type="number" name="flockSize" value={flockSize} onChange={this.onChange}/><br/>
            <hr/>
            <label for="feedType">What did you feed them?: </label>
            <input className="float-right" type="text" name="feedType" value={feedType} onChange={this.onChange}/>
            <hr/>
            <label for="feedAmt">Approximately how much food did you feed them (in grams)?</label>
            <input type="number" name="feedAmt" value={feedAmt} onChange={this.onChange}/>
            <hr/>
            <label for="feedLoc">Where did you feed the ducks?</label>
            <input type="hidden" name="feedLoc" value={feedLoc} />
            <LocationMap position={this.state.feedLoc} setPosition={this.setPosition} />

            </ModalBody>
            <ModalFooter>
            <Button color="primary" type="submit">Submit Data</Button>{' '}
            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
            </ModalFooter>
            </form>
        </Modal>
        </>
        );
    }
}

export default EntryModal;
