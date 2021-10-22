import {Button, Stack, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import * as Server from "../scripts/server";
import Box from "@mui/material/Box";

function JoinGrouping({joined}) {
    const [groupingId, setGroupingId] = useState('');
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        if(groupingId.length > 0) {
            setEnabled(true);
        } else {
            setEnabled(false);
        }
    }, [groupingId]);

    async function joinGrouping() {
        if(groupingId != null) {
            const [voter, grouping] = await Promise.all([Server.joinGrouping(groupingId), Server.getGrouping(groupingId)]);
            joined(voter, grouping);
        }
    }

    return <Box>
        <h1>Join a Grouping</h1>
        <Stack sx={{p:5}} spacing={2}>
        <TextField
            id="grouping-field"
            label="Grouping id"
            value={groupingId || ''}
            onChange={evt => setGroupingId(evt.target.value)}/>
        <Button
            variant="contained"
            disabled={!enabled}
            onClick={joinGrouping}>Join</Button>
    </Stack>
    </Box>
}

export default JoinGrouping;
