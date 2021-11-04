import List from '@mui/material/List'
import {Button, Grid, IconButton, InputAdornment, ListItem, TextField} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";
import * as Server from "../scripts/server";
import Title from "./Title";
import Box from "@mui/material/Box";
import AddIcon from '@mui/icons-material/Add';

function TermList(props) {
    const [newTerm, setNewTerm] = useState('');
    const [terms, setTerms] = useState([]);

    function updateNewTerm(event) {
        setNewTerm(event.target.value)
    }

    function handleInputKeypress(event) {
        if (event.key === "Enter") {
            addNewTerm();
        }
    }

    function addNewTerm() {
        setTerms((prevState => ([
            ...prevState, newTerm
        ])));
        setNewTerm('');
    }

    function deleteTerm(index) {
        const newTerms = Array.from(terms);
        newTerms.splice(index, 1);
        setTerms(newTerms);
    }

    function sendTerms() {
        Server.sendTerms(props.voterId, terms).then(() => {
            props.finishFunction();
        });
    }

    return <Box>
        <Title>Add Items</Title>
        <Grid container spacing={2} sx={{my: 0}}>
            <Grid item xs={3}/>
            <Grid item xs={6}>
                <Box sx={{my: 3}}>
                    <TextField
                        id="new-term"
                        label="Item"
                        variant="outlined"
                        onChange={evt => updateNewTerm(evt)}
                        onKeyPress={evt => handleInputKeypress(evt)}
                        value={newTerm}
                        InputProps={{endAdornment:
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={addNewTerm}
                                    edge="end">
                                    <AddIcon/>
                                </IconButton>
                            </InputAdornment>}}
                    />
                    <Box sx={{flexBasis: "100%"}}/>
                    <Button variant="contained" onClick={sendTerms} sx={{my: 3, ml: 3}}>Finish</Button>
                </Box>
                <List>
                    {terms.map((term, index) => {
                        return <ListItem
                            key={index}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={() => deleteTerm(index)}>
                                    <DeleteIcon/>
                                </IconButton>
                            }>
                            {term}
                        </ListItem>
                    })}
                </List>
            </Grid>
            <Grid item xs={3}/>
        </Grid>
    </Box>
}

export default TermList;
