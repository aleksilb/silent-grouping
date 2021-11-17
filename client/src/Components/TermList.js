import List from '@mui/material/List'
import {Button, Divider, IconButton, InputAdornment, ListItem, TextField, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";
import * as Server from "../scripts/server";
import Title from "./Title";
import Box from "@mui/material/Box";
import AddIcon from '@mui/icons-material/Add';
import CenteredPage from "./CenteredPage";

function TermList({grouper, finishFunction}) {
    const grouping = grouper.grouping;
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
        Server.sendTerms(grouper.id, terms).then(() => {
            finishFunction();
        });
    }

    return <Box>
        <Title>Add Items</Title>
        <CenteredPage>
            Add items that you think should be in {grouping.name}
            <Box sx={{my: 3}}>
                <TextField
                    id="new-term"
                    label="Item"
                    variant="outlined"
                    onChange={evt => updateNewTerm(evt)}
                    onKeyPress={evt => handleInputKeypress(evt)}
                    value={newTerm}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <Tooltip title="Add item">
                                    <IconButton
                                        onClick={addNewTerm}
                                        edge="end">
                                        <AddIcon/>
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                    }}
                />
                <Box sx={{flexBasis: "100%"}}/>
                <Button variant="contained" onClick={sendTerms} sx={{my: 3, ml: 3}}>Finish</Button>
            </Box>
            <List sx={{width:300, margin:"auto"}}>
                {terms.map((term, index) => {
                    return <Box><ListItem
                        key={index}
                        sx={{py:2}}
                        secondaryAction={
                            <Tooltip title="Delete item">
                                <IconButton edge="end" aria-label="delete" onClick={() => deleteTerm(index)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Tooltip>
                        }>
                        {term}
                    </ListItem>
                        {index < terms.length - 1 ? <Divider/> : null}
                    </Box>
                })}
            </List>
        </CenteredPage>
    </Box>
}

export default TermList;
