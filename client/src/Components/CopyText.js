import {IconButton, Typography} from "@mui/material";
import {ContentCopy} from "@mui/icons-material";

function CopyText({children}) {
    function copyToClipboard(content) {
        navigator.clipboard.writeText(content);
    }

    return <Typography component={"span"} sx={{fontWeight: "bold", fontSize: 18}}>
        {children}
        <IconButton aria-label="copy to clipboard" onClick={() => copyToClipboard(children)}>
            <ContentCopy/>
        </IconButton>
    </Typography>
}

export default CopyText;
