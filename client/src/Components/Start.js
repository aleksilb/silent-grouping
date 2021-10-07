import NewGrouping from "./NewGrouping";
import {Button, TextField} from "@mui/material";
import {useState} from "react";
const API = 'http://localhost:5000';

function Start(props) {
    const [groupingId, setGroupingId] = useState(null);

    function joinGrouping() {
        if(groupingId != null) {
            fetch(API + '/voter/'+groupingId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.text())
                .then(voterId => {
                    console.log(voterId);
                    props.finishFunction(); //TODO Send voter id
            });
        }
    }

    function groupingCreated(id) {
        setGroupingId(id);
    }

    return <div>
        <h1>Start new grouping</h1>
        <NewGrouping groupingCreated={groupingCreated}/>
        <h1>Join grouping</h1>
        <TextField
            id="grouping-field"
            label="Grouping id"
            onChange={evt => setGroupingId(evt.target.value)}
        />
        <Button  onClick={joinGrouping}>Join</Button>
    </div>
}

export default Start;
