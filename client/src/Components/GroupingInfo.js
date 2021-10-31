import {Card, CardContent, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";

function GroupingInfo({name, description}) {
    return <Card sx={{
        width: 300,
        height: 94,
        backgroundColor: grey[100],
        textOverflow: 'ellipsis'
    }}>
        <CardContent sx={{textAlign: "left", px: 1, py:0.5}}>
            <Typography sx={{fontSize:16}}>
                {name}
            </Typography>
            <Typography sx={{mb: 1.5, fontSize:14}} color="text.secondary">
                {description}
            </Typography>
        </CardContent>
    </Card>
}

export default GroupingInfo;
