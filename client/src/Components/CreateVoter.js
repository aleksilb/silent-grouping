import {useEffect, useState} from "react";
import * as Server from "../scripts/server";
import {Navigate} from "react-router-dom";

function CreateVoter({groupingId}) {
    const [voter, setVoter] = useState(null);

    useEffect(() => {
        if (groupingId != null) {
            Server.joinGrouping(groupingId).then(voter => setVoter(voter));
        }
    }, [groupingId]);

    return <div>{voter && <Navigate to={"/voter/"+voter.id} />}</div>
}

export default CreateVoter;
