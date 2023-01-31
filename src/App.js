import './App.css';
import Results from './components/results';
import Dropdown from './components/dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Dropdown/>
      <Switch>
          <Route path="/season/:season" component={Results} />
      </Switch>
    </BrowserRouter>
    )
}

export default App;
