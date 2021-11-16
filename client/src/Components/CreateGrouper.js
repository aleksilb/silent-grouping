import {useEffect, useState} from "react";
import * as Server from "../scripts/server";
import {Navigate} from "react-router-dom";

function CreateGrouper({groupingId}) {
    const [grouper, setGrouper] = useState(null);

    useEffect(() => {
        if (groupingId != null) {
            Server.joinGrouping(groupingId).then(grouper => setGrouper(grouper));
        }
    }, [groupingId]);

    return <div>{grouper && <Navigate to={"/grouper/"+grouper.id} />}</div>
}

export default CreateGrouper;
