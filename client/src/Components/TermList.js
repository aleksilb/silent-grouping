import List from '@mui/material/List'
import {Button, IconButton, ListItem, TextField} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";

function TermList() {
    const [newTerm, setNewTerm] = useState(null);
    const [terms, setTerms] = useState([]);

    function updateNewTerm(event) {
        setNewTerm(event.target.value)
    }

    function addNewTerm() {
        setTerms((prevState => ([
            ...prevState, newTerm
        ])));
    }

    function deleteTerm(index) {
        const newTerms = Array.from(terms);
        newTerms.splice(index, 1);
        setTerms(newTerms);
    }

    return <div>
        <List>
            {terms.map((term, index) => {
                return <ListItem
                    key={index}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => deleteTerm(index)}>
                            <DeleteIcon />
                        </IconButton>
                    }>
                    {term}
                </ListItem>
            })}
        </List>
        <TextField
            id="new-term"
            label="Outlined"
            variant="outlined"
            onChange={evt => updateNewTerm(evt)}
        />
        <Button variant="contained" onClick={addNewTerm}>Add new term</Button>
    </div>
}

export default TermList;
