import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import BuildDetail from './home/content/builddetail/BuildDetail';
import ImportBuild from './importbuild/ImportBuild';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      {/* <Route exact path='/importbuild/:importcode' element={<ImportBuild/>} />
      <Route exact path='/builddetail/' element={<BuildDetail />}/> */}
    </Routes>
  );
}

export default App;
