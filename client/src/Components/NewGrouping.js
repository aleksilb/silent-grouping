import {Button, Grid, Typography} from "@mui/material";
import {Box} from "@mui/system";
import Title from "./Title";
import {useState} from "react";
import CreateVoter from "./CreateVoter";

function NewGrouping({grouping}) {
    const [join, setJoin] = useState(false);

    async function joinGrouping() {
        setJoin(true);
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
                    onClick={joinGrouping}>
                    Start grouping</Button>
            </Grid>
            <Grid item xs={3}/>
        </Grid>
        {join && <CreateVoter groupingId={grouping.id}/>}
    </Box>
}

export default NewGrouping;
