import {Button, Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import CreateGrouper from "./CreateGrouper";

function JoinGrouping() {
    const [groupingId, setGroupingId] = useState('');
    const [enabled, setEnabled] = useState(false);
    const [join, setJoin] = useState(false);

    useEffect(() => {
        if (groupingId.length > 0) {
            setEnabled(true);
        } else {
            setEnabled(false);
        }
    }, [groupingId]);

    async function joinGrouping() {
        setJoin(true);
    }

    return <Box>
        <Typography variant={"h2"}>Join a Grouping</Typography>
        <Stack sx={{p: 5}} spacing={2}>
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
        {join && <CreateGrouper groupingId={groupingId}/>}
    </Box>
}

export default JoinGrouping;
