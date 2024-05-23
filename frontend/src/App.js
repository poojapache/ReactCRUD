import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home.js'
import Login from './Components/Login.js';
import SignUp from './Components/SignUp.js';
import Admin from './Pages/Admin.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/login/admin' element={<Admin/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
