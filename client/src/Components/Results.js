import {useEffect, useRef, useState} from "react";
import * as Server from '../scripts/server';
import List from "@mui/material/List";
import {ListItem} from "@mui/material";

function Results(props) {
    const [groups, setGroups] = useState([]);
    const [waiting, setWaiting] = useState(true);

    const pollWait = function () {
        timerRef.current = setTimeout(checkStage, 500);
    };

    const pollWaitRef = useRef(pollWait);
    const timerRef = useRef(0);

    useEffect(() => {
        pollWaitRef.current();

        return () => {
            clearTimeout(timerRef.current);
        }
    }, []);

    function checkStage() {
        Server.getGrouping(props.groupingId)
            .then(grouping => {
                if(grouping.stage === 'Done') {
                    setWaiting(false);
                    clearTimeout(timerRef.current);
                    getGroups();
                } else {
                    pollWait();
                }
            })
    }

    function getGroups() {
        Server.getGroups(props.groupingId).then(groups => {
            setGroups(groups);
        });
    }

    return <div>
        <h1>Results</h1>
        {waiting ?
            <div>waiting...</div>
            :
            groups.map(group =>
                <List>
                    {group.map((item, index) =>
                        <ListItem key={index}>{item}</ListItem>)}
                </List>)}
    </div>
}

export default Results;
