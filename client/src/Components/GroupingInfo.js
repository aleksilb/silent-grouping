import {Card, CardContent, IconButton, Tooltip, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {useNavigate} from "react-router-dom";
import {Close} from "@mui/icons-material";

function GroupingInfo({grouping, grouper}) {
    let navigate = useNavigate();

    return <Card sx={{
        width: 300,
        height: 94,
        backgroundColor: grey[100],
        textOverflow: 'ellipsis'
    }}>
        <CardContent sx={{textAlign: "left", px: 1, py: 0.5}}>
            <Tooltip title="Leave grouping">
                <IconButton sx={{float: "right"}} aria-label="leave" onClick={() => {
                    navigate(grouper != null ? '/leave/'+grouper.id : '/leave')
                }}>
                    <Close/>
                </IconButton>
            </Tooltip>
            <Typography sx={{fontSize: 16}}>
                {grouping.name}
            </Typography>
            <Typography sx={{mb: 1.5, fontSize: 14}} color="text.secondary">
                {grouping.description}
            </Typography>
        </CardContent>
    </Card>
}

export default GroupingInfo;
