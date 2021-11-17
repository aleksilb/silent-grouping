import {Box} from "@mui/system";
import {Typography} from "@mui/material";
import GroupingInfo from "./GroupingInfo";


function Title({children, grouper, grouping}) {

    return <Box sx={{display:"flex",justifyContent: 'space-between', flexWrap: 'wrap'}}>
        <Box sx={{width:"300px"}}/>
        <Typography variant={"h2"}>{children}</Typography>
        {grouper ? <GroupingInfo grouping={grouper.grouping} grouper={grouper}/> : (grouping ? <GroupingInfo grouping={grouping}/> :<Box sx={{width:"300px"}}/>)}
    </Box>
}

export default Title;
