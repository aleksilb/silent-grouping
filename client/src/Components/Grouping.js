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
    let {voterId} = useParams();
    const [voter, setVoter] = useState(null);
    const [stage, setStage] = useState(null);
    const StageChecker = useRef(null);

    useEffect(() => {
        if (voterId != null) {
            Server.getVoter(voterId).then(voter => setVoter(voter));
            StageChecker.current = Stage.getChecker(voterId, setStage);
        }
        return () => {
            StageChecker.current.close();
        }
    }, [voterId]);

    useEffect(() => {
        if (voter != null && StageChecker != null) {
            StageChecker.current.checkForStageChange(voter.id);
        }
        if (voter != null && groupingSelected != null) {
            Server.getGrouping(voter.grouping).then(grouping => groupingSelected(grouping));
        }
    }, [voter, StageChecker, groupingSelected]);

    function pageFinished() {
        StageChecker.current.checkForStageChange(voter.id);
    }

    return <Box>
        {stage === Stage.Stage.COLLECTING && <TermList voterId={voter.id} finishFunction={pageFinished}/>}
        {stage === Stage.Stage.GROUPING &&
        <Board voterId={voter.id} groupingId={voter.grouping} finishFunction={pageFinished}/>}
        {stage === Stage.Stage.DONE && <Results/>}
        {stage === Stage.Stage.WAITING && <Waiting/>}
    </Box>
}

export default Grouping;
