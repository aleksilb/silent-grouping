import {Box} from "@mui/system";
import Title from "./Title";
import CenteredPage from "./CenteredPage";
import {CircularProgress, Typography} from "@mui/material";

function Waiting({grouper}) {
    return <Box>
        <Title grouper={grouper}>Wait for others</Title>
        <CenteredPage>
            <Typography>Please wait while others finish this stage</Typography>
            <CircularProgress sx={{mt:3}}/>
        </CenteredPage>
    </Box>
}

export default Waiting;
