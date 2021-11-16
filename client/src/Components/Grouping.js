import * as Stage from "../scripts/stage";
import Waiting from "./Waiting";
import TermList from "./TermList";
import Board from "./Board";
import Results from "./Results";
import Box from "@mui/material/Box";
import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import * as Server from "../scripts/server";

function Grouping({groupingSelected}) {
    let {grouperId} = useParams();
    const [grouper, setGrouper] = useState(null);
    const [stage, setStage] = useState(null);
    const StageChecker = useRef(null);

    useEffect(() => {
        if (grouperId != null) {
            Server.getGrouper(grouperId).then(grouper => setGrouper(grouper));
            StageChecker.current = Stage.getChecker(grouperId, setStage);
        }
        return () => {
            StageChecker.current.close();
        }
    }, [grouperId]);

    useEffect(() => {
        if (grouper != null && StageChecker != null) {
            StageChecker.current.checkForStageChange(grouper.id);
        }
        if (grouper != null && groupingSelected != null) {
            Server.getGrouping(grouper.grouping.id).then(grouping => groupingSelected(grouping));
        }
    }, [grouper, StageChecker, groupingSelected]);

    function pageFinished() {
        StageChecker.current.checkForStageChange(grouper.id);
    }

    return <Box>
        {stage === Stage.Stage.COLLECTING && <TermList grouperId={grouper.id} finishFunction={pageFinished}/>}
        {stage === Stage.Stage.GROUPING &&
        <Board grouperId={grouper.id} groupingId={grouper.grouping.id} finishFunction={pageFinished}/>}
        {stage === Stage.Stage.DONE && <Results/>}
        {stage === Stage.Stage.WAITING && <Waiting/>}
    </Box>
}

export default Grouping;
