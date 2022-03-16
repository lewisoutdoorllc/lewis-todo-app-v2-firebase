import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

function App() {

  return (
    // MAIN ROUTER THAT ALLOWS ALL THE ROUTES TO CONNECT AND WORK
    <BrowserRouter>
      <div className="App">
        {/* ROUTES CONTAINER THAT WILL CONTROL OUR INDIVDUAL ROUTES */}
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
