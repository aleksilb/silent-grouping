import {Button, Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import * as Server from '../scripts/server';
import Box from "@mui/material/Box";

function CreateGrouping({created}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        if(name.length > 0) {
            setEnabled(true);
        } else {
            setEnabled(false);
        }
    }, [name]);

    function createGrouping() {
        Server.createGrouping(name, description).then(grouping => {
            created(grouping);
        });
    }

    return <Box >
        <Typography variant={"h2"}>Start a New Grouping</Typography>
        <Stack sx={{p:5}} spacing={2}>
            <TextField
                id="name-field"
                label="Name"
                variant="outlined"
                value={name}
                onChange={evt => setName(evt.target.value)}/>

            <TextField
                id="description-field"
                label="Description"
                variant="outlined"
                value={description}
                rows={4}
                multiline
                onChange={evt => setDescription(evt.target.value)}/>
            <Button disabled={!enabled} variant="contained" onClick={createGrouping}>Create grouping</Button>
        </Stack>
    </Box>
}

export default CreateGrouping;
