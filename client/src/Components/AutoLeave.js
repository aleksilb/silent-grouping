import {useEffect, useState} from "react";
import {Box} from "@mui/system";
import {Navigate, useParams} from "react-router-dom";
import * as Server from "../scripts/server";

function AutoLeave({groupSetter}) {
    let {grouperId} = useParams();
    const [left, setLeft] = useState(false);

    useEffect(() => {
        Server.leaveGrouping(grouperId).then(() => {
            groupSetter(null);
            setLeft(true);
        });
    }, [groupSetter, grouperId]);

    return <Box>
        Leaving grouping
        {left && <Navigate to="/"/>}
    </Box>
}

export default AutoLeave;
