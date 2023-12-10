import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './components/home';
import Map from './components/map';
import Tutorial from './components/tutorial';

function App() {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/map' element={<Map/>}/>
        <Route path='/tutorial' element={<Tutorial/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
