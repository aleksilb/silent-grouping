import './App.css';
import TermList from "./Components/TermList";
import Board from "./Components/Board";
import {useState} from "react";

function App() {
    const [page, setPage] = useState('terms');

    return (
        <div className="App">
            {(page === 'terms') ? <TermList/> : null}
            {(page === 'board') ? <Board/> : null}
        </div>
    );
}

export default App;
