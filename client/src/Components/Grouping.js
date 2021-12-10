import * as Stage from "../scripts/stage";
import Waiting from "./Waiting";
import ItemList from "./ItemList";
import Board from "./Board";
import Results from "./Results";
import Box from "@mui/material/Box";
import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import * as Server from "../scripts/server";

function Grouping() {
    let {grouperId} = useParams();
    const [grouper, setGrouper] = useState(null);
    const [stage, setStage] = useState(null);
    const StageChecker = useRef(null);

    useEffect(() => {
        if (grouperId != null) {
            Server.getGrouper(grouperId).then(grouper => {
                setGrouper(grouper);
            });
            StageChecker.current = Stage.getChecker(grouperId, setStage);
            StageChecker.current.checkForStageChange(grouperId);
        }
        return () => {
            if(StageChecker.current != null) {
                StageChecker.current.close();
            }
        }
    }, [grouperId]);

    function pageFinished() {
        StageChecker.current.checkForStageChange(grouper.id);
    }

    return <Box>
        {stage === Stage.Stage.COLLECTING && <ItemList grouper={grouper} finishFunction={pageFinished}/>}
        {stage === Stage.Stage.GROUPING && <Board grouper={grouper} finishFunction={pageFinished}/>}
        {stage === Stage.Stage.DONE && <Results grouper={grouper}/>}
        {stage === Stage.Stage.WAITING && <Waiting/>}
    </Box>
}

export default Grouping;
