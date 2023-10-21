import { Redirect, Route } from 'react-router-dom';
import Home from './pages/Home';
import Graph from "./pages/graph"
import logo from './logo.svg';
import Arcana from './pages/auth'
import FileUploadForm from './pages/upload';
import ChatApp from './pages/chat';
import './App.css';
/* Theme variables */
import './theme/variables.css';

function App() {
  return (
    <ChatApp />
  );
}

export default App;
