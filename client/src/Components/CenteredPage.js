import {Grid} from "@mui/material";

function CenteredPage({children}) {
    return <Grid container spacing={2} sx={{my:0}}>
        <Grid item xs={3}/>
        <Grid item xs={6}>
            {children}
        </Grid>
        <Grid item xs={3}/>
    </Grid>
}

export default CenteredPage;
