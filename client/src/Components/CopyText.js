import {IconButton, Tooltip, Typography} from "@mui/material";
import {ContentCopy} from "@mui/icons-material";

function CopyText({children}) {
    function copyToClipboard(content) {
        navigator.clipboard.writeText(content);
    }

    return <Typography component={"span"} sx={{fontWeight: "bold", fontSize: 18}}>
        {children}
        <Tooltip title="Copy to clipboard">
            <IconButton aria-label="copy to clipboard" onClick={() => copyToClipboard(children)}>
                <ContentCopy/>
            </IconButton>
        </Tooltip>
    </Typography>
}

export default CopyText;
