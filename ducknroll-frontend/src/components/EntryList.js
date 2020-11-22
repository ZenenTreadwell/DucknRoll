import React from "react";

import { Table } from 'reactstrap';


function EntryList(props) {
    // entries within the array will be mapped through this function and output as table entries
    const tableEntry = (entry) => {
        let date = new Date(entry.feedTime);
        
        // We need to parse the latitude and longitude from the text data
        let loc = entry.feedLoc.split(" ");
        let lon = parseFloat(loc[2]);
        let lat = parseFloat(loc[1].slice(1));
        
        return (
            <tr>
            <th scope="row">{entry.id}</th>
            <td>{date.toDateString()}</td>
            <td>{date.toTimeString()}</td>
            <td>{entry.flockSize}</td>
            <td>{entry.feedType}</td>
            <td>{entry.feedAmt}g</td>
            <td><a href={"https://duckduckgo.com/?t=ffab&q=" + lon + "%2C+" + lat + "&iaxm=maps"}>{lon.toFixed(2)},{lat.toFixed(2)}</a></td>
            </tr>
        );
    }

    return (
        <Table>
        <thead>
        <tr>
        <th>Entry #</th>
        <th>Date</th>
        <th>Time</th>
        <th>Flock Size</th>
        <th>Feed</th>
        <th>Amount</th>
        <th>Location (lat/long)</th>
        </tr>
        </thead>
        <tbody>
        {props.entries.sort((a,b) => a.id - b.id).map(tableEntry)}
        </tbody>
        </Table>
    );
}

export default EntryList;
