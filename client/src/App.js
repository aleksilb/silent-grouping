import './App.css';
import Start from "./Components/Start";
import {Box} from "@mui/system";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Grouping from "./Components/Grouping";
import AutoJoin from "./Components/AutoJoin";
import AutoLeave from "./Components/AutoLeave";

function App() {
    return (
        <Router>
                <Box className="App"
                     sx={{
                         pt: 2,
                         px: 10
                     }}>
                    <Routes>
                        <Route path="/" element={<Start/>}/>
                        <Route path="/grouping/:id" element={<AutoJoin/>}/>
                        <Route path="/grouper/:grouperId" element={<Grouping/>}/>
                        <Route path="/leave/:grouperId" element={<AutoLeave/>}/>
                        <Route path="/leave" element={<AutoLeave/>}/>
                    </Routes>
                </Box>
        </Router>
    );
}

export default App;
