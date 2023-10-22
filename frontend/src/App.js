import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import logo from './logo.svg';
import Arcana from './pages/auth'
import FileUploadForm from './pages/upload';
import ChatApp from './pages/chat';
import ListPage from './pages/list';
import './App.css';
/* Theme variables */
import './theme/variables.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Arcana />} />
        <Route path="/upload" element={<FileUploadForm />} />
        <Route path="/chat" element={<ChatApp />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
