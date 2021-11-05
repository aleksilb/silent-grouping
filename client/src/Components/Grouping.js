import * as Stage from "../scripts/stage";
import Waiting from "./Waiting";
import TermList from "./TermList";
import Board from "./Board";
import Results from "./Results";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import * as Server from "../scripts/server";

function Grouping({groupingSelected}) {
    let { voterId } = useParams();
    const [voter, setVoter] = useState(null);
    const [stage, setStage] = useState(null);
    const StageChecker = Stage.getChecker(setStage);

    useEffect(() => {
        if(voterId != null) {
            Server.getVoter(voterId).then(voter => setVoter(voter));
        }
    }, [voterId]);

    useEffect(() => {
        if (voter != null && StageChecker != null) {
            StageChecker.checkForStageChange(voter.id);
        }
        if(voter != null && groupingSelected != null) {
            Server.getGrouping(voter.grouping).then(grouping => groupingSelected(grouping));
        }
    }, [voter, StageChecker, groupingSelected]);

    function pageFinished() {
        StageChecker.checkForStageChange(voter.id);
    }

    return <Box>
        {stage === Stage.Stage.WAITING && <Waiting/>}
        {stage === Stage.Stage.COLLECTING && <TermList voterId={voter.id} finishFunction={pageFinished}/>}
        {stage === Stage.Stage.GROUPING &&
        <Board voterId={voter.id} groupingId={voter.grouping} finishFunction={pageFinished}/>}
        {stage === Stage.Stage.DONE && <Results groupingId={voter.grouping}/>}
    </Box>
}

export default Grouping;
