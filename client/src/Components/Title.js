import {Box} from "@mui/system";
import {Typography} from "@mui/material";
import GroupingInfo from "./GroupingInfo";
import {useContext} from "react";
import {GroupingContext} from "../App";


function Title({children}) {
    const grouping = useContext(GroupingContext)

    return <Box sx={{display:"flex",justifyContent: 'space-between'}}>
        <Box sx={{width:"300px"}}/>
        <Typography variant={"h2"}>{children}</Typography>
        {grouping ? <GroupingInfo name={grouping.name} description={grouping.description}/> : <Box sx={{width:"300px"}}/>}
    </Box>
}

export default Title;
