import {Button, TextField} from "@mui/material";
import {useState} from "react";
import * as Server from '../scripts/server';

function CreateGrouping({created}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function createGrouping() {
        Server.createGrouping(name, description).then(grouping => {
            created(grouping);
        });
    }

    return <div>
        <h1>Start new grouping</h1>
        <TextField
            id="name-field"
            label="Name"
            variant="outlined"
            value={name}
            onChange={evt => setName(evt.target.value)}
        />
        <TextField
            id="description-field"
            label="Description"
            variant="outlined"
            value={description}
            rows={4}
            multiline
            onChange={evt => setDescription(evt.target.value)}
        />
        <Button variant="contained" onClick={createGrouping}>Start new grouping</Button>
    </div>
}

export default CreateGrouping;
