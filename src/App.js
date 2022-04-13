import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import BuildDetail from './home/content/builddetail/BuildDetail';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/builddetail' element={<BuildDetail />}/>
    </Routes>
  );
}

export default App;
