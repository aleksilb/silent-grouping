import './App.css';
import TermList from "./Components/TermList";
import Board from "./Components/Board";
import Results from "./Components/Results";
import {useEffect, useState} from "react";
import Start from "./Components/Start";
import * as Stage from "./scripts/stage";
import Waiting from "./Components/Waiting";
import GroupingTitle from "./Components/GroupingTitle";

function App() {
    const [stage, setStage] = useState(Stage.Stage.START);
    const [voter, setVoter] = useState(null);
    const [grouping, setGrouping] = useState(null);
    const StageChecker = Stage.getChecker(setStage);

    useEffect(() => {
        if(voter != null && StageChecker != null) {
            StageChecker.checkForStageChange(voter.id);
        }
    }, [voter, StageChecker]);

    function pageFinished() {
        StageChecker.checkForStageChange(voter.id);
    }

    function voterCreated(voter, grouping) {
        setVoter(voter);
        setGrouping(grouping);
    }

    return (
        <div className="App">
            {grouping && <GroupingTitle grouping={grouping}/>}
            {stage === Stage.Stage.START && <Start voterCreated={voterCreated}/>}
            {stage === Stage.Stage.WAITING && <Waiting/>}
            {stage === Stage.Stage.COLLECTING && <TermList voterId={voter.id} finishFunction={pageFinished}/>}
            {stage === Stage.Stage.GROUPING && <Board voterId={voter.id} groupingId={grouping.id} finishFunction={pageFinished}/>}
            {stage === Stage.Stage.DONE && <Results groupingId={grouping.id}/>}
        </div>
    );
}

export default App;
