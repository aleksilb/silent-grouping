import {Box} from "@mui/system";
import {Typography} from "@mui/material";
import GroupingInfo from "./GroupingInfo";
import {useContext} from "react";
import {GroupingContext} from "../App";


function Title({children}) {
    const groupingContext = useContext(GroupingContext);

    return <Box sx={{display:"flex",justifyContent: 'space-between', flexWrap: 'wrap'}}>
        <Box sx={{width:"300px"}}/>
        <Typography variant={"h2"}>{children}</Typography>
        {groupingContext.grouping ? <GroupingInfo grouping={groupingContext.grouping}/> : <Box sx={{width:"300px"}}/>}
    </Box>
}

export default Title;
