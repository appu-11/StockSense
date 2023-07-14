import { Route, Routes, Switch } from 'react-router-dom';
import './App.css';
import Homepage from './components/homepage/hompage';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Profile from './components/profile/profile';
import CompanyName from './components/company/company';
import PrivateRoute from './context/private';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Homepage/>} />
        <Route exact path="/profile" element={<PrivateRoute/>}>
          <Route exact path='' element={<Profile/>} />
        </Route>
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/signup' element={<Signup/>} />
        <Route exact path='/profile' element={<Profile/>} />
        <Route path='/:companysymbol' element={<CompanyName/>} />
      </Routes>
    </div>
  );
}

export default App;
