import './App.css';
import {createContext, useState} from "react";
import Start from "./Components/Start";
import {Box} from "@mui/system";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Grouping from "./Components/Grouping";
import AutoJoin from "./Components/AutoJoin";
import AutoLeave from "./Components/AutoLeave";

export const GroupingContext = createContext(null);

function App() {
    const [grouping, setGrouping] = useState(null);

    return (
        <Router>
            <GroupingContext.Provider value={
                {"grouping":grouping}}>
                <Box className="App"
                     sx={{
                         pt: 2,
                         px: 10
                     }}>
                    <Routes>
                        <Route path="/" element={<Start groupingSelected={setGrouping}/>}/>
                        <Route path="/grouping/:id" element={<AutoJoin/>}/>
                        <Route path="/grouper/:grouperId" element={<Grouping groupingSelected={setGrouping}/>}/>
                        <Route path="/leave/:grouperId" element={<AutoLeave groupSetter={setGrouping}/>}/>
                    </Routes>
                </Box>
            </GroupingContext.Provider>
        </Router>
    );
}

export default App;
