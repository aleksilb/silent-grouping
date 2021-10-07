import NewGrouping from "./NewGrouping";
import {Button, TextField} from "@mui/material";
import {useState} from "react";
import * as Server from '../scripts/server';

function Start(props) {
    const [groupingId, setGroupingId] = useState(null);

    function joinGrouping() {
        if(groupingId != null) {
            Server.joinGrouping(groupingId).then(voterId => {
                props.voterCreated(voterId);
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
