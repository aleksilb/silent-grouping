import CreateGrouping from "./CreateGrouping";
import {useState} from "react";
import Box from '@mui/material/Box';
import JoinGrouping from "./JoinGrouping";
import NewGrouping from "./NewGrouping";
import {Divider, Grid} from "@mui/material";

function Start({voterCreated}) {
    const [created, setCreated] = useState(false);
    const [grouping, setGrouping] = useState(null);

    function groupingCreated(grouping) {
        setGrouping(grouping);
        setCreated(true);
    }

    return <Box>
        {!created && <Grid container spacing={2}>
            <Grid item xs>
                <CreateGrouping created={groupingCreated}/>
            </Grid>
            <Divider orientation="vertical" flexItem>
                OR
            </Divider>
            <Grid item xs>
                <JoinGrouping joined={voterCreated}/>
            </Grid>
        </Grid>}
        {created && grouping && <NewGrouping grouping={grouping} joined={voterCreated}/>}
    </Box>
}

export default Start;
