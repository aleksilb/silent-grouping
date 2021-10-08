import './App.css';
import TermList from "./Components/TermList";
import Board from "./Components/Board";
import Results from "./Components/Results";
import {useState} from "react";
import Start from "./Components/Start";
const pages = ['new', 'terms', 'board', 'results'];

function App() {
    const [page, setPage] = useState('new');
    const [voterId, setVoterId] = useState(null);
    const [groupingId, setGroupingId] = useState(null);

    function pageFinished() {
        const currentPageIndex = pages.indexOf(page);
        const nextPage = pages[currentPageIndex + 1];
        setPage(nextPage);
    }

    function voterCreated(voterId, groupingId) {
        setVoterId(voterId);
        setGroupingId(groupingId)
        setPage('terms')
    }

    return (
        <div className="App">
            {(page === 'new') ? <Start voterCreated={voterCreated}/> : null}
            {(page === 'terms') ? <TermList voterId={voterId} finishFunction={pageFinished}/> : null}
            {(page === 'board') ? <Board voterId={voterId} groupingId={groupingId} finishFunction={pageFinished}/> : null}
            {(page === 'results') ? <Results groupingId={groupingId}/> : null}
        </div>
    );
}

export default App;
