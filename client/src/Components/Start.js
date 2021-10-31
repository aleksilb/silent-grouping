import CreateGrouping from "./CreateGrouping";
import {useState} from "react";
import Box from '@mui/material/Box';
import JoinGrouping from "./JoinGrouping";
import NewGrouping from "./NewGrouping";
import {Divider, Grid} from "@mui/material";

function Start({voterCreated, groupingCreated}) {
    const [grouping, setGrouping] = useState(null);

    function _groupingCreated(grouping) {
        setGrouping(grouping);
        groupingCreated(grouping);
    }

    function joined(voter, grouping) {
        setGrouping(grouping);
        voterCreated(voter);
        groupingCreated(grouping);
    }

    return <Box>
        {!grouping && <Grid container spacing={2}>
            <Grid item xs>
                <CreateGrouping created={_groupingCreated}/>
            </Grid>
            <Divider orientation="vertical" flexItem>
                OR
            </Divider>
            <Grid item xs>
                <JoinGrouping joined={joined}/>
            </Grid>
        </Grid>}
        {grouping && <NewGrouping grouping={grouping} joined={joined}/>}
    </Box>
}

export default Start;
