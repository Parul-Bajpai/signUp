import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import Packages from './components/Packages';
import SignUp from './components/SignUp';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/packages" element={<Packages />} />
          <Route exact path="/signUp" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
