import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

/* APP TODOS
Need to GET a collection from our Firestore db

- Import onSnapshot, collection from firebase/firestore
- Import db from './utils/firebase
- Fetch db from firestore
- In useEffect() use onSnapshot(collectionRef, ()=>)
- map through snapshot data and setFiltered Tasks to the snapshot.data()
- Don't forget when you map through add the id
*/

// Hardcoded Tasks Data that we will ask Firebase for instead
// const data = [
//   { id: 31, text: "Finish contacts hw", status: false },
//   { id: 0, text: "Study react hooks", status: false },
//   { id: 9, text: "Finish Clever programmer challenge", status: false },
//   { id: 21, text: "Run 1 mile", status: false },
//   { id: 5, text: "Finish errands", status: false },
//   { id: 13, text: "Complete Todo App", status: false },
// ];

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
