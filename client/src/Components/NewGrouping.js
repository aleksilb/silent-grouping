import {Button} from "@mui/material";

function NewGrouping(props) {

    return <div>
        <Button variant="contained" onClick={props.finishFunction}>Start new grouping</Button>
    </div>
}

export default NewGrouping;
