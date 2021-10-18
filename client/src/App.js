import './App.css';
import TermList from "./Components/TermList";
import Board from "./Components/Board";
import Results from "./Components/Results";
import {useEffect, useState} from "react";
import Start from "./Components/Start";
import * as Stage from "./scripts/stage";

function App() {
    const [stage, setStage] = useState(Stage.Stage.START);
    const [voterId, setVoterId] = useState(null);
    const [groupingId, setGroupingId] = useState(null);
    const StageChecker = Stage.getChecker(setStage);

    useEffect(() => {
        if(voterId != null && StageChecker != null) {
            StageChecker.checkForStageChange(voterId).error(console.error);
        }
    }, [voterId, StageChecker]);

    function pageFinished() {
        StageChecker.checkForStageChange(voterId).error(console.error);
    }

    function voterCreated(voterId, groupingId) {
        setVoterId(voterId);
        setGroupingId(groupingId);
    }

    return (
        <div className="App">
            {(stage === Stage.Stage.START) ? <Start voterCreated={voterCreated}/> : null}
            {(stage === Stage.Stage.WAITING) ? <div>Waiting</div> : null}
            {(stage === Stage.Stage.COLLECTING) ? <TermList voterId={voterId} finishFunction={pageFinished}/> : null}
            {(stage === Stage.Stage.GROUPING) ? <Board voterId={voterId} groupingId={groupingId} finishFunction={pageFinished}/> : null}
            {(stage === Stage.Stage.DONE) ? <Results groupingId={groupingId}/> : null}
        </div>
    );
}

export default App;
