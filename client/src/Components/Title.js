import {Box} from "@mui/system";
import {Typography} from "@mui/material";
import GroupingInfo from "./GroupingInfo";
import {useContext, useEffect, useState} from "react";
import {GrouperContext} from "../App";


function Title({children, grouping}) {
    const [groupingInt, setGroupingInt] = useState(null);
    const grouperContext = useContext(GrouperContext);

    useEffect(() => {
        if(grouping != null) {
            setGroupingInt(grouping);
        } else if(grouperContext != null) {
            setGroupingInt(grouperContext.grouping);
        }
    }, [grouperContext, grouping, setGroupingInt])

    return <Box sx={{display:"flex",justifyContent: 'space-between', flexWrap: 'wrap'}}>
        <Box sx={{width:"300px"}}/>
        <Typography variant={"h2"}>{children}</Typography>
        {groupingInt ? <GroupingInfo grouping={groupingInt} grouper={grouperContext}/> : <Box sx={{width:"300px"}}/>}
    </Box>
}

export default Title;
