import './App.css';
import {createContext, useState} from "react";
import Start from "./Components/Start";
import {Box} from "@mui/system";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Grouping from "./Components/Grouping";
import AutoJoin from "./Components/AutoJoin";
import AutoLeave from "./Components/AutoLeave";

export const GrouperContext = createContext(null);

function App() {
    const [grouper, setGrouper] = useState(null);

    return (
        <Router>
            <GrouperContext.Provider value={grouper}>
                <Box className="App"
                     sx={{
                         pt: 2,
                         px: 10
                     }}>
                    <Routes>
                        <Route path="/" element={<Start/>}/>
                        <Route path="/grouping/:id" element={<AutoJoin/>}/>
                        <Route path="/grouper/:grouperId" element={<Grouping grouperSetter={setGrouper}/>}/>
                        <Route path="/leave/:grouperId" element={<AutoLeave grouperSetter={setGrouper}/>}/>
                        <Route path="/leave" element={<AutoLeave grouperSetter={setGrouper}/>}/>
                    </Routes>
                </Box>
            </GrouperContext.Provider>
        </Router>
    );
}

export default App;
