import {useEffect, useState} from "react";
import * as Server from '../scripts/server';
import List from "@mui/material/List";
import {ListItem} from "@mui/material";

function Results(props) {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        Server.getGroups(props.groupingId).then(groups => {
            setGroups(groups);
        });
    }, [props.groupingId]);

    return <div>
        <h1>Results</h1>
        {groups.map(group =>
            <List>
                {group.map(item =>
                    <ListItem>{item}</ListItem>)}
            </List>)}
    </div>
}

export default Results;
