import {Button, TextField} from "@mui/material";
import {useState} from "react";
const API = 'http://localhost:5000';

function NewGrouping(props) {
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);

    function createGrouping() {
        const data = {
            name: name,
            description: description
        }

        fetch(API + '/grouping', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(result => {
            console.log(result)
        });

        props.finishFunction();
    }

    return <div>
        <TextField
            id="name-field"
            label="Name"
            variant="outlined"
            onChange={evt => setName(evt.target.value)}
        />
        <TextField
            id="description-field"
            label="Description"
            variant="outlined"
            rows={4}
            multiline
            onChange={evt => setDescription(evt.target.value)}
        />
        <Button variant="contained" onClick={createGrouping}>Start new grouping</Button>
    </div>
}

export default NewGrouping;
