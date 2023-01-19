import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { AuthProvider } from "./context/auth"
import Homepage from './Components/Homepage/Homepage'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/feed" element={<Home />}></Route>
          <Route path="/i/flow/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
