import NewGrouping from "./NewGrouping";
import {Button, TextField} from "@mui/material";
import {useState} from "react";
import * as Server from '../scripts/server';

function Start(props) {
    const [groupingId, setGroupingId] = useState(null);

    function joinGrouping() {
        if(groupingId != null) {
            Server.joinGrouping(groupingId).then(voterId => {
                props.voterCreated(voterId, groupingId);
            });
        }
    }

    function groupingCreated(id) {
        setGroupingId(id);
    }

    return <div>
        {groupingId == null ?
            <div><h1>Start new grouping</h1> <NewGrouping groupingCreated={groupingCreated}/></div>
            :null
        }

        <h1>Join grouping</h1>
        <TextField
            id="grouping-field"
            label="Grouping id"
            InputLabelProps={{ shrink: true }}
            value={groupingId || ''}
            onChange={evt => setGroupingId(evt.target.value)}
        />
        <Button  onClick={joinGrouping}>Join</Button>
    </div>
}

export default Start;
