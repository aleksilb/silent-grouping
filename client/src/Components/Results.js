import {useEffect, useState} from "react";
import * as Server from '../scripts/server';
import List from "@mui/material/List";
import {Button, Card, ListItem, Typography} from "@mui/material";
import Title from "./Title";
import CenteredPage from "./CenteredPage";
import {useNavigate} from "react-router-dom";
import {Box} from "@mui/system";

function Results({grouper}) {
    const grouping = grouper.grouping;
    let navigate = useNavigate();
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        Server.getGroups(grouping.id).then(groups => {
            setGroups(groups);
        });
    }, [grouping]);

    return <div>
        <Title grouper={grouper}>Results</Title>
        <CenteredPage>
            Here are the combined groups of <Typography component={"span"} sx={{fontWeight: "bold", fontSize: 16}}>{grouping.name}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', mb:4 }}>
            {groups.map(group =>
                <Card sx={{minWidth: 150, my:3, mx:3}} raised>
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
