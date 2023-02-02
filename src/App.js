import './App.css';
import Results from './components/results';
import MatchDropdown from './components/dropdown';
import MatchInfo from './components/matchinfo';
import Home from "./components/home";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <MatchDropdown/>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/season/:season" element={<Results />} />
          <Route path="/match/:match" element={<MatchInfo />} />
      </Routes>
    </BrowserRouter>
    )
}

export default App;
