import CreateGrouping from "./CreateGrouping";
import {useState} from "react";
import JoinGrouping from "./JoinGrouping";
import NewGrouping from "./NewGrouping";

function Start({voterCreated}) {
    const [created, setCreated] = useState(false);
    const [grouping, setGrouping] = useState(null);

    function groupingCreated(grouping) {
        setGrouping(grouping);
        setCreated(true);
    }

    return <div>
        {!created && <CreateGrouping created={groupingCreated}/>}
        {created && grouping && <NewGrouping grouping={grouping} joined={voterCreated}/>}
        {!created && <JoinGrouping joined={voterCreated}/>}
    </div>
}

export default Start;
