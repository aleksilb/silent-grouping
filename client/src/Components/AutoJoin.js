import {Box} from "@mui/system";
import CreateGrouper from "./CreateGrouper";

const {useParams} = require("react-router-dom");

function AutoJoin() {
    let { id } = useParams();

    return <Box>
        Joining grouping {id}
        {id && <CreateGrouper groupingId={id} />}
    </Box>
}

export default AutoJoin;
