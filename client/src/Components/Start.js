import CreateGrouping from "./CreateGrouping";
import {useState} from "react";
import Box from '@mui/material/Box';
import JoinGrouping from "./JoinGrouping";
import NewGrouping from "./NewGrouping";
import {Divider, Grid} from "@mui/material";

function Start() {
    const [grouping, setGrouping] = useState(null);

    return <Box>
        {!grouping && <Box>
            <Grid container spacing={2}>
                <Grid item xs>
                    <CreateGrouping created={setGrouping}/>
                </Grid>
                <Divider orientation="vertical" flexItem>
                    OR
                </Divider>
                <Grid item xs>
                    <JoinGrouping/>
                </Grid>
            </Grid>
        </Box>}
        {grouping && <NewGrouping grouping={grouping}/>}
    </Box>
}

export default Start;
