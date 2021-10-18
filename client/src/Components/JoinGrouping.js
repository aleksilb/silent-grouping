import {Button, TextField} from "@mui/material";
import {useState} from "react";
import * as Server from "../scripts/server";

function JoinGrouping({joined}) {
    const [groupingId, setGroupingId] = useState(null);

    async function joinGrouping() {
        if(groupingId != null) {
            const [voter, grouping] = await Promise.all([Server.joinGrouping(groupingId), Server.getGrouping(groupingId)]);
            joined(voter, grouping);
        }
    }

    return <div>
        <h1>Join grouping</h1>
        <TextField
            id="grouping-field"
            label="Grouping id"
            InputLabelProps={{ shrink: true }}
            value={groupingId || ''}
            onChange={evt => setGroupingId(evt.target.value)}
        />
        <Button onClick={joinGrouping}>Join</Button>
    </div>
}

export default JoinGrouping;
