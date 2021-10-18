import {Button} from "@mui/material";
import * as Server from "../scripts/server";

function NewGrouping({grouping, joined}) {

    async function join() {
        const voter = await Server.joinGrouping(grouping.id);
        joined(voter, grouping);
    }

    return <div>
        <h1>Grouping created</h1>
        <p>
            You have created a new grouping!
        </p>
        <p>
            Invite more people with id {grouping.id}
        </p>
        <Button onClick={join}>Start grouping</Button>
    </div>
}

export default NewGrouping;
