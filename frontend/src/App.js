import { Redirect, Route } from 'react-router-dom';
import Home from './pages/Home';
import Graph from "./pages/graph"
import logo from './logo.svg';
import Arcana from './pages/auth'
import './App.css';
/* Theme variables */
import './theme/variables.css';

function App() {
  return (
    <Arcana />
  );
}

export default App;
