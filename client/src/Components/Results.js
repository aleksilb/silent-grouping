import {useEffect, useState} from "react";
import * as Server from '../scripts/server';
import List from "@mui/material/List";
import {ListItem} from "@mui/material";
import Title from "./Title";
import CenteredPage from "./CenteredPage";

function Results(props) {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        Server.getGroups(props.groupingId).then(groups => {
            setGroups(groups);
        });
    }, [props.groupingId]);

    return <div>
        <Title>Results</Title>
        <CenteredPage>
            {groups.map(group =>
                <List>
                    {group.map((item, index) =>
                        <ListItem key={index}>{item}</ListItem>)}
                </List>)}
        </CenteredPage>
    </div>
}

export default Results;
