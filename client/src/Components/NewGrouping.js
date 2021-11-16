import {Button, Typography} from "@mui/material";
import {Box} from "@mui/system";
import Title from "./Title";
import {useState} from "react";
import CreateGrouper from "./CreateGrouper";
import CopyText from "./CopyText";
import CenteredPage from "./CenteredPage";

function NewGrouping({grouping}) {
    const [join, setJoin] = useState(false);
    const joinUrl = window.location.origin + '/grouping/' + grouping.id;

    async function joinGrouping() {
        setJoin(true);
    }

    return <Box>
        <Title>Invite people</Title>
        <CenteredPage>
            <Typography variant={"h6"} sx={{mt: "4px"}}>
                Invite people to the grouping with id <CopyText>{grouping.id}</CopyText>
            </Typography>
            <Typography variant={"h6"} sx={{mt: "4px", mb:4}}>
                Or with a link <CopyText>{joinUrl}</CopyText>
            </Typography>
            <Button
                variant="contained"
                onClick={joinGrouping}>
                Start grouping</Button>
        </CenteredPage>
        {join && <CreateGrouper groupingId={grouping.id}/>}
    </Box>
}

export default NewGrouping;
