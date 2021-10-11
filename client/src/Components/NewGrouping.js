import {Button, TextField} from "@mui/material";
import {useState} from "react";
import * as Server from '../scripts/server';

function NewGrouping(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function createGrouping() {
        Server.createGrouping(name, description).then(groupingId => {
            props.groupingCreated(groupingId);
        });
    }

    return <div>
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

export default NewGrouping;
