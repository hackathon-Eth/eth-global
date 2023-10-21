import { Redirect, Route } from 'react-router-dom';
import Home from './pages/Home';
import Graph from "./pages/graph"
import logo from './logo.svg';
import './App.css';
/* Theme variables */
import './theme/variables.css';

function App() {
  return (
    // <div className="App">
    //   <Route exact path="/" component={Home} />
    //   <Route exact path="/graph" component={Graph} />
    // </div>
    <Home />
  );
}

export default App;
