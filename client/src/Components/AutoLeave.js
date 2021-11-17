import {useEffect, useState} from "react";
import {Box} from "@mui/system";
import {Navigate, useParams} from "react-router-dom";
import * as Server from "../scripts/server";

function AutoLeave() {
    let {grouperId} = useParams();
    const [left, setLeft] = useState(false);

    useEffect(() => {
        if(grouperId != null) {
            Server.leaveGrouping(grouperId).then(() => {
                setLeft(true);
            });
        } else {
            setLeft(true);
        }
    }, [grouperId]);

    return <Box>
        Leaving grouping
        {left && <Navigate to="/"/>}
    </Box>
}

export default AutoLeave;
