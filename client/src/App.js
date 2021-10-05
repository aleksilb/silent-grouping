import './App.css';
import NewGrouping from "./Components/NewGrouping";
import TermList from "./Components/TermList";
import Board from "./Components/Board";
import Results from "./Components/Results";
import {useState} from "react";
const pages = ['new', 'terms', 'board', 'results'];

function App() {
    const [page, setPage] = useState('new');

    function pageFinished() {
        const currentPageIndex = pages.indexOf(page);
        const nextPage = pages[currentPageIndex + 1];
        setPage(nextPage);
    }

    return (
        <div className="App">
            {(page === 'new') ? <NewGrouping finishFunction={pageFinished}/> : null}
            {(page === 'terms') ? <TermList finishFunction={pageFinished}/> : null}
            {(page === 'board') ? <Board finishFunction={pageFinished}/> : null}
            {(page === 'results') ? <Results/> : null}
        </div>
    );
}

export default App;
