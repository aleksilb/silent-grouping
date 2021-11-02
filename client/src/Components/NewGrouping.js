import {Button, Grid, Typography} from "@mui/material";
import * as Server from "../scripts/server";
import {Box} from "@mui/system";
import Title from "./Title";

function NewGrouping({grouping, joined}) {

    async function join() {
        const voter = await Server.joinGrouping(grouping.id);
        joined(voter, grouping);
    }

    return <Box>
        <Title>Invite people</Title>
        <Grid container spacing={2} sx={{my:0}}>
            <Grid item xs={3}/>
            <Grid item xs={6}>
                <Typography variant={"h6"} sx={{mt: "4px"}}>
                    Invite people to the grouping with id <Typography component={"span"} sx={{fontWeight:"bold", fontSize:18}}>{grouping.id}</Typography>
                </Typography>
                <Button
                    variant="contained"
                    onClick={join}>
                    Start grouping</Button>
            </Grid>
            <Grid item xs={3}/>
        </Grid>
    </Box>
}

export default NewGrouping;
