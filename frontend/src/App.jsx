import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import ReportAnimal from "./pages/ReportAnimal";
import Reports from "./pages/Reports";
import ReportDetails from "./pages/ReportDetails";
function App(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
             <Route path="/report" element={<ReportAnimal/>}/>
              <Route path="/reports" element={<Reports/>}/>
              <Route path="/reports/:id" element={<ReportDetails/>}/>
        </Routes>
    )
}
export default App;