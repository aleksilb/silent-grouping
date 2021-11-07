import {useEffect, useState} from "react";
import {Box} from "@mui/system";
import {Navigate} from "react-router-dom";

function AutoLeave({groupSetter}) {
    const [left, setLeft] = useState(false);

    useEffect(() => {
        groupSetter(null);
        setLeft(true);
    }, [groupSetter]);

    return <Box>
        Leaving grouping
        {left && <Navigate to="/"/>}
    </Box>
}

export default AutoLeave;
