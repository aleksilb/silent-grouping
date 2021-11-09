import {useContext, useEffect, useState} from "react";
import * as Server from '../scripts/server';
import List from "@mui/material/List";
import {Button, Card, ListItem} from "@mui/material";
import Title from "./Title";
import CenteredPage from "./CenteredPage";
import {useNavigate} from "react-router-dom";
import {Box} from "@mui/system";
import {GroupingContext} from "../App";

function Results() {
    const groupingContext = useContext(GroupingContext);
    const grouping = groupingContext.grouping;
    let navigate = useNavigate();
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        Server.getGroups(grouping.id).then(groups => {
            setGroups(groups);
        });
    }, [grouping.id]);

    return <div>
        <Title>Results</Title>
        <CenteredPage>
            Here are the combined groups of {grouping.name}
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', mb:4 }}>
            {groups.map(group =>
                <Card sx={{minWidth: 150, my:3, mr:3}} raised>
                    <List>
                        {group.map((item, index) =>
                            <ListItem key={index}>{item}</ListItem>)}
                    </List>
                </Card>)}
            </Box>
            <Button variant="contained" onClick={() => navigate('/leave')}>Restart</Button>
        </CenteredPage>
    </div>
}

export default Results;
