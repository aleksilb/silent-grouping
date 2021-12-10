import List from '@mui/material/List'
import {Button, Divider, IconButton, InputAdornment, ListItem, TextField, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";
import * as Server from "../scripts/server";
import Title from "./Title";
import Box from "@mui/material/Box";
import AddIcon from '@mui/icons-material/Add';
import CenteredPage from "./CenteredPage";

function ItemList({grouper, finishFunction}) {
    const grouping = grouper.grouping;
    const [newItem, setNewItem] = useState('');
    const [items, setItems] = useState([]);

    function updateNewItem(event) {
        setNewItem(event.target.value)
    }

    function handleInputKeypress(event) {
        if (event.key === "Enter") {
            addNewItem();
        }
    }

    function addNewItem() {
        setItems((prevState => ([
            ...prevState, newItem
        ])));
        setNewItem('');
    }

    function deleteItem(index) {
        const newItems = Array.from(items);
        newItems.splice(index, 1);
        setItems(newItems);
    }

    function sendItems() {
        Server.sendItems(grouper.id, items).then(() => {
            finishFunction();
        });
    }

    return <Box>
        <Title grouper={grouper}>Add Items</Title>
        <CenteredPage>
            Add items that you think should be in {grouping.name}
            <Box sx={{my: 3}}>
                <TextField
                    id="new-item"
                    label="Item"
                    variant="outlined"
                    onChange={evt => updateNewItem(evt)}
                    onKeyPress={evt => handleInputKeypress(evt)}
                    value={newItem}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <Tooltip title="Add item">
                                    <IconButton
                                        onClick={addNewItem}
                                        edge="end">
                                        <AddIcon/>
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                    }}
                />
                <Box sx={{flexBasis: "100%"}}/>
                <Button variant="contained" onClick={sendItems} sx={{my: 3, ml: 3}}>Finish</Button>
            </Box>
            <List sx={{width:300, margin:"auto"}}>
                {items.map((item, index) => {
                    return <Box><ListItem
                        key={index}
                        sx={{py:2}}
                        secondaryAction={
                            <Tooltip title="Delete item">
                                <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(index)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Tooltip>
                        }>
                        {item}
                    </ListItem>
                        {index < items.length - 1 ? <Divider/> : null}
                    </Box>
                })}
            </List>
        </CenteredPage>
    </Box>
}

export default ItemList;
