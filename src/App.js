import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import BuildDetail from './home/content/builddetail/BuildDetail';
import ImportBuild from './importbuild/ImportBuild';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/builddetail' element={<BuildDetail />}/>
      <Route path='/importbuild/:importcode' element={<ImportBuild/>} />
    </Routes>
  );
}

export default App;
