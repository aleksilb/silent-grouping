import {Box} from "@mui/system";
import CreateVoter from "./CreateVoter";

const {useParams} = require("react-router-dom");

function AutoJoin() {
    let { id } = useParams();

    return <Box>
        Joining grouping {id}
        {id && <CreateVoter groupingId={id} />}
    </Box>
}

export default AutoJoin;
