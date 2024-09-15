
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Home from './components/Home';
import Paginaone from "./components/Paginaone";
import Paginatwo from "./components/Paginatwo";

function App(){
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Pageone" element={<Paginaone />} />
          <Route path="/Pagetwo" element={<Paginatwo />} />
        </Routes>
      </div>
    </Router>
  );
}



export default App;